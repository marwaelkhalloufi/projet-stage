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
       // In your MissionController store and update methods
$validated = $request->validate([
    'objet' => 'required|string',
    'date_debut' => 'required|date',
    'date_fin' => 'required|date|after_or_equal:date_debut',
    'destination' => 'required|string', // Changed from 'trajet'
    'agent_id' => 'required|exists:agents,id',
    'vehicule_id' => 'required|exists:vehicules,id',
    'statut' => 'nullable|string|in:planifie,en_cours,termine,annule',
    'description' => 'nullable|string', // Added this field
    'budget_prevu' => 'nullable|numeric|min:0', // Added this field
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

        // In your MissionController store and update methods
$validated = $request->validate([
    'objet' => 'required|string',
    'date_debut' => 'required|date',
    'date_fin' => 'required|date|after_or_equal:date_debut',
    'destination' => 'required|string', // Changed from 'trajet'
    'agent_id' => 'required|exists:agents,id',
    'vehicule_id' => 'required|exists:vehicules,id',
    'statut' => 'nullable|string|in:planifie,en_cours,termine,annule',
    'description' => 'nullable|string', // Added this field
    'budget_prevu' => 'nullable|numeric|min:0', // Added this field
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
}
