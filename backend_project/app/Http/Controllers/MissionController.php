<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    // List missions (already done)
    public function index()
    {
        $missions = Mission::with(['agent', 'vehicule'])->get();

        return response()->json([
            'success' => true,
            'data' => $missions,
            'message' => 'Missions retrieved successfully'
        ]);
    }

    // Show a single mission (consult)
    public function show($id)
    {
        $mission = Mission::with(['agent', 'vehicule'])->find($id);
        if (!$mission) {
            return response()->json(['success' => false, 'message' => 'Mission not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $mission]);
    }

    // Insert a new mission
    public function store(Request $request)
    {
        $validated = $request->validate([
            'objet' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'destination' => 'required|string',
            'agent_id' => 'required|exists:agents,id',
            'vehicule_id' => 'required|exists:vehicules,id',
            'statut' => 'nullable|string|in:planifie,en_cours,termine,annule',
            'description' => 'nullable|string',
            'budget_prevu' => 'nullable|numeric|min:0',
            'titre' => 'nullable|string',         // ADDED
            'direction' => 'nullable|string',     // ADDED - your original field
            'user_id' => 'nullable|exists:users,id', // ADDED
        ]);

        $mission = Mission::create($validated);

        return response()->json(['success' => true, 'data' => $mission, 'message' => 'Mission created successfully']);
    }

    // Update an existing mission
    public function update(Request $request, $id)
    {
        $mission = Mission::find($id);
        if (!$mission) {
            return response()->json(['success' => false, 'message' => 'Mission not found'], 404);
        }

        $validated = $request->validate([
            'objet' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'destination' => 'required|string',
            'agent_id' => 'required|exists:agents,id',
            'vehicule_id' => 'required|exists:vehicules,id',
            'statut' => 'nullable|string|in:planifie,en_cours,termine,annule',
            'description' => 'nullable|string',
            'budget_prevu' => 'nullable|numeric|min:0',
            'titre' => 'nullable|string',         // ADDED
            'direction' => 'nullable|string',     // ADDED - your original field
            'user_id' => 'nullable|exists:users,id', // ADDED
        ]);

        $mission->update($validated);

        return response()->json(['success' => true, 'data' => $mission, 'message' => 'Mission updated successfully']);
    }

    // Delete a mission
    public function destroy($id)
    {
        $mission = Mission::findOrFail($id);
        if (!$mission) {
            return response()->json(['success' => false, 'message' => 'Mission not found'], 404);
        }

        $mission->delete();

        return response()->json(['success' => true, 'message' => 'Mission deleted successfully']);
    }

    // (Optional) Validate mission
    public function validateMission($id)
    {
        $mission = Mission::findOrFail($id);
        $mission->update(['statut' => 'validated']);

        return response()->json([
            'success' => true,
            'message' => 'Mission validated successfully',
            'data' => $mission
        ]);
    }

    // ============ NEW METHODS FOR MAP FUNCTIONALITY ============

    /**
     * Get active missions (for map display)
     */
    public function getActiveMissions()
    {
        try {
            $missions = Mission::whereIn('statut', ['planifie', 'en_cours'])
                ->with(['agent', 'vehicule', 'tracking' => function($query) {
                    $query->latest('timestamp');
                }])
                ->get();

            return response()->json([
                'success' => true,
                'data' => $missions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching active missions'
            ], 500);
        }
    }

    /**
     * Get missions by status
     */
    public function getByStatus($status)
    {
        try {
            $missions = Mission::where('statut', $status)
                ->with(['agent', 'vehicule'])
                ->get();

            return response()->json([
                'success' => true,
                'data' => $missions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching missions'
            ], 500);
        }
    }

    /**
     * Get missions with tracking data
     */
    public function getMissionsWithTracking()
    {
        try {
            $missions = Mission::with([
                'agent',
                'vehicule',
                'tracking' => function($query) {
                    $query->orderBy('timestamp', 'desc');
                }
            ])->get();

            return response()->json([
                'success' => true,
                'data' => $missions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching missions with tracking'
            ], 500);
        }
    }
}
