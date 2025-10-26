<?php

namespace App\Http\Controllers;

use App\Models\Tracking;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrackingController extends Controller
{
    /**
     * Get all tracking records with relationships
     */
    public function index()
    {
        try {
            $tracking = Tracking::with(['vehicule', 'mission'])
                ->orderBy('timestamp', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $tracking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des données de tracking'
            ], 500);
        }
    }

    /**
     * Get tracking for a specific record
     */
    public function show($id)
    {
        try {
            $tracking = Tracking::with(['vehicule', 'mission'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $tracking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Tracking non trouvé'
            ], 404);
        }
    }

    /**
     * Get tracking by vehicule ID
     */
    public function getByVehicule($vehiculeId)
    {
        try {
            $tracking = Tracking::where('vehicule_id', $vehiculeId)
                ->with(['mission'])
                ->orderBy('timestamp', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $tracking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération'
            ], 500);
        }
    }

    /**
     * Get tracking by mission ID
     */
    public function getByMission($missionId)
    {
        try {
            $tracking = Tracking::where('mission_id', $missionId)
                ->with(['vehicule'])
                ->orderBy('timestamp', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $tracking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération'
            ], 500);
        }
    }

    /**
     * Create new tracking record
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'vehicule_id' => 'required|exists:vehicules,id',
                'mission_id' => 'nullable|exists:missions,id',
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180',
                'etat_voiture' => 'required|in:conforme,anomalie',
                'ville' => 'nullable|string',
                'timestamp' => 'nullable|date'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            if (!isset($data['timestamp'])) {
                $data['timestamp'] = now();
            }

            $tracking = Tracking::create($data);

            // Update vehicle etat if needed
            if (isset($data['etat_voiture'])) {
                $vehicule = Vehicule::find($data['vehicule_id']);
                if ($vehicule) {
                    $vehicule->update(['etat' => $data['etat_voiture']]);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $tracking->load(['vehicule', 'mission']),
                'message' => 'Tracking créé avec succès'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update tracking record
     */
    public function update(Request $request, $id)
    {
        try {
            $tracking = Tracking::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'vehicule_id' => 'sometimes|exists:vehicules,id',
                'mission_id' => 'nullable|exists:missions,id',
                'latitude' => 'sometimes|numeric|between:-90,90',
                'longitude' => 'sometimes|numeric|between:-180,180',
                'etat_voiture' => 'sometimes|in:conforme,anomalie',
                'ville' => 'nullable|string',
                'timestamp' => 'sometimes|date'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $tracking->update($validator->validated());

            return response()->json([
                'success' => true,
                'data' => $tracking->load(['vehicule', 'mission']),
                'message' => 'Tracking mis à jour avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour'
            ], 500);
        }
    }

    /**
     * Delete tracking record
     */
    public function destroy($id)
    {
        try {
            $tracking = Tracking::findOrFail($id);
            $tracking->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tracking supprimé avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression'
            ], 500);
        }
    }

    /**
     * Get latest tracking for all vehicles
     */
    public function getLatestTracking()
    {
        try {
            $tracking = Tracking::getLatestForVehicles();

            return response()->json([
                'success' => true,
                'data' => $tracking
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération'
            ], 500);
        }
    }
}
