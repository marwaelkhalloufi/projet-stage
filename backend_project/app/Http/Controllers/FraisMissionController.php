<?php

namespace App\Http\Controllers;

use App\Models\FraisMission;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class FraisMissionController extends Controller
{
    public function index()
    {
        try {
            $fraisMissions = FraisMission::with('mission')->get();
            return response()->json([
                'success' => true,
                'data' => $fraisMissions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des frais'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $fraisMission = FraisMission::with('mission')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $fraisMission
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Frais non trouvé'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            // Handle expense treatment request from React component
            if ($request->has(['direction', 'mois', 'annee'])) {
                return $this->traiterFrais($request);
            }

            // Handle regular frais creation
            $validator = Validator::make($request->all(), [
                'type_frais' => 'required|string',
                'montant' => 'required|numeric|min:0',
                'date_frais' => 'required|date',
                'description' => 'nullable|string',
                'justificatif' => 'nullable|string',
                'mission_id' => 'required|exists:missions,id',
                'statut' => 'nullable|in:en_attente,approuve,rejete'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $fraisMission = FraisMission::create($request->all());

            return response()->json([
                'success' => true,
                'data' => $fraisMission,
                'message' => 'Frais créé avec succès'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du frais'
            ], 500);
        }
    }

    /**
     * Handle expense treatment based on direction, month, and year
     */
    public function traiterFrais(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'direction' => 'required|string',
                'mois' => 'required|string',
                'annee' => 'required|integer|min:2020|max:2030'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $direction = $request->direction;
            $mois = $request->mois;
            $annee = $request->annee;

            // Convert month name to number
            $monthNumber = $this->getMonthNumber($mois);
            if (!$monthNumber) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mois invalide'
                ], 422);
            }

            // Create date range for the specified month and year
            $startDate = Carbon::createFromDate($annee, $monthNumber, 1)->startOfMonth();
            $endDate = Carbon::createFromDate($annee, $monthNumber, 1)->endOfMonth();

            // Find missions based on destination and objet fields (not direction)
            $missions = Mission::where(function($query) use ($direction) {
                    $query->where('destination', 'LIKE', "%{$direction}%")
                          ->orWhere('objet', 'LIKE', "%{$direction}%");
                })
                ->where(function($query) use ($startDate, $endDate) {
                    $query->whereBetween('date_debut', [$startDate, $endDate])
                          ->orWhereBetween('date_fin', [$startDate, $endDate])
                          ->orWhere(function($subQuery) use ($startDate, $endDate) {
                              $subQuery->where('date_debut', '<=', $startDate)
                                       ->where('date_fin', '>=', $endDate);
                          });
                })
                ->get();

            if ($missions->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => "Aucune mission trouvée pour '{$direction}' en {$mois} {$annee}",
                    'debug' => [
                        'search_term' => $direction,
                        'start_date' => $startDate->format('Y-m-d'),
                        'end_date' => $endDate->format('Y-m-d')
                    ]
                ], 404);
            }

            // Get all frais for these missions
            $missionIds = $missions->pluck('id');
            $fraisMissions = FraisMission::whereIn('mission_id', $missionIds)
                ->whereBetween('date_frais', [$startDate, $endDate])
                ->get();

            // Process/treat the expenses
            $totalFrais = $fraisMissions->sum('montant');
            $fraisParType = $fraisMissions->groupBy('type_frais')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('montant')
                ];
            });

            // Update status of treated expenses (optional)
            FraisMission::whereIn('mission_id', $missionIds)
                ->whereBetween('date_frais', [$startDate, $endDate])
                ->where('statut', 'en_attente')
                ->update(['statut' => 'traite']);

            return response()->json([
                'success' => true,
                'message' => 'Traitement des frais effectué avec succès',
                'data' => [
                    'search_criteria' => [
                        'direction_recherchee' => $direction,
                        'periode' => "{$mois} {$annee}",
                        'date_debut' => $startDate->format('Y-m-d'),
                        'date_fin' => $endDate->format('Y-m-d')
                    ],
                    'resultats' => [
                        'missions_trouvees' => $missions->count(),
                        'frais_traites' => $fraisMissions->count(),
                        'total_montant' => $totalFrais,
                        'frais_par_type' => $fraisParType
                    ],
                    'missions' => $missions->map(function($mission) {
                        return [
                            'id' => $mission->id,
                            'objet' => $mission->objet,
                            'destination' => $mission->destination,
                            'date_debut' => $mission->date_debut,
                            'date_fin' => $mission->date_fin
                        ];
                    }),
                    'frais_details' => $fraisMissions->map(function($frais) {
                        return [
                            'id' => $frais->id,
                            'type_frais' => $frais->type_frais,
                            'montant' => $frais->montant,
                            'date_frais' => $frais->date_frais,
                            'statut' => $frais->statut,
                            'mission_id' => $frais->mission_id
                        ];
                    })
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du traitement des frais: ' . $e->getMessage(),
                'debug' => [
                    'line' => $e->getLine(),
                    'file' => basename($e->getFile())
                ]
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $fraisMission = FraisMission::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'type_frais' => 'sometimes|string',
                'montant' => 'sometimes|numeric|min:0',
                'date_frais' => 'sometimes|date',
                'description' => 'nullable|string',
                'justificatif' => 'nullable|string',
                'mission_id' => 'sometimes|exists:missions,id',
                'statut' => 'sometimes|in:en_attente,approuve,rejete,traite'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $fraisMission->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $fraisMission,
                'message' => 'Frais mis à jour avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $fraisMission = FraisMission::findOrFail($id);
            $fraisMission->delete();

            return response()->json([
                'success' => true,
                'message' => 'Frais supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression'
            ], 500);
        }
    }

    /**
     * Convert French month name to month number
     */
    private function getMonthNumber($monthName)
    {
        $months = [
            'Janvier' => 1,
            'Février' => 2,
            'Mars' => 3,
            'Avril' => 4,
            'Mai' => 5,
            'Juin' => 6,
            'Juillet' => 7,
            'Août' => 8,
            'Septembre' => 9,
            'Octobre' => 10,
            'Novembre' => 11,
            'Décembre' => 12
        ];

        return $months[$monthName] ?? null;
    }

    /**
     * Get expenses by status
     */
    public function getByStatus($status)
    {
        try {
            $fraisMissions = FraisMission::with('mission')
                ->where('statut', $status)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $fraisMissions
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération'
            ], 500);
        }
    }
}
