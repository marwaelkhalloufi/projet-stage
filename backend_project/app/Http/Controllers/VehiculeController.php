<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehiculeController extends Controller
{
    /**
     * Get all vehicles with their latest tracking and current mission
     */
    public function index()
    {
        try {
            $vehicules = Vehicule::all();

            return response()->json([
                'success' => true,
                'data' => $vehicules
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des véhicules',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a single vehicle with tracking history
     */
    public function show($id)
    {
        try {
            $vehicule = Vehicule::with([
                'tracking' => function($query) {
                    $query->orderBy('timestamp', 'desc')->limit(10);
                },
                'missions' => function($query) {
                    $query->orderBy('date_debut', 'desc')->limit(5);
                }
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $vehicule
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Véhicule non trouvé',
            ], 404);
        }
    }

    /**
     * Create a new vehicle
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'immatriculation' => 'required|string|unique:vehicules,immatriculation',
                'marque' => 'required|string',
                'modele' => 'required|string',
                'annee' => 'nullable|integer',
                'type_carburant' => 'nullable|string',
                'consommation_moyenne' => 'nullable|numeric'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $vehicule = Vehicule::create($validator->validated());

            return response()->json([
                'success' => true,
                'data' => $vehicule,
                'message' => 'Véhicule créé avec succès'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du véhicule',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a vehicle
     */
    public function update(Request $request, $id)
    {
        try {
            $vehicule = Vehicule::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'immatriculation' => 'sometimes|string|unique:vehicules,immatriculation,' . $id,
                'marque' => 'sometimes|string',
                'modele' => 'sometimes|string',
                'annee' => 'nullable|integer',
                'type_carburant' => 'nullable|string',
                'consommation_moyenne' => 'nullable|numeric'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $vehicule->update($validator->validated());

            return response()->json([
                'success' => true,
                'data' => $vehicule,
                'message' => 'Véhicule mis à jour avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a vehicle
     */
    public function destroy($id)
    {
        try {
            $vehicule = Vehicule::findOrFail($id);
            $vehicule->delete();

            return response()->json([
                'success' => true,
                'message' => 'Véhicule supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get vehicles with map data (optimized for map display)
     * This is the method your Map component is calling
     */
    public function getMapData()
    {
        try {
            $vehicules = Vehicule::with([
                'latestTracking',
                'currentMission'
            ])->get()->map(function($vehicule) {
                $tracking = $vehicule->latestTracking;
                $mission = $vehicule->currentMission;

                return [
                    'id' => $vehicule->id,
                    'immatriculation' => $vehicule->immatriculation,
                    'marque' => $vehicule->marque,
                    'modele' => $vehicule->modele,
                    'annee' => $vehicule->annee,
                    'type_carburant' => $vehicule->type_carburant,
                    'disponible' => true, // You can add this field to your vehicules table
                    'etat' => $tracking ? $tracking->etat_voiture : 'conforme',
                    'latitude' => $tracking ? (float)$tracking->latitude : null,
                    'longitude' => $tracking ? (float)$tracking->longitude : null,
                    'ville' => $tracking ? $tracking->ville : null,
                    'last_update' => $tracking ? $tracking->timestamp : null,
                    'mission' => $mission ? [
                        'id' => $mission->id,
                        'objet' => $mission->objet,
                        'destination' => $mission->destination,
                        'statut' => $mission->statut,
                    ] : null,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $vehicules
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des données',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
