<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    // List missions (already done)
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->can('view-all-data')) {
            $missions = Mission::with(['agent', 'vehicule'])->get();
        } elseif ($user->can('view-own-missions')) {
            $missions = Mission::where('agent_id', $user->id)->with(['agent', 'vehicule'])->get();
        } elseif ($user->can('read-missions')) {
            $missions = Mission::with(['agent', 'vehicule'])->get();
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $missions
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
            'numero_mission' => 'required|unique:mission,numero_mission',
            'objet' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'trajet' => 'required|string',
            'agent_id' => 'required|exists:users,id',
            'vehicule_id' => 'required|exists:vehicules,id',
            'statut' => 'nullable|string',
            'anomalie' => 'nullable|string',
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
            'numero_mission' => "required|unique:mission,numero_mission,{$id}",
            'objet' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'trajet' => 'required|string',
            'agent_id' => 'required|exists:users,id',
            'vehicule_id' => 'required|exists:vehicules,id',
            'statut' => 'nullable|string',
            'anomalie' => 'nullable|string',
        ]);

        $mission->update($validated);

        return response()->json(['success' => true, 'data' => $mission, 'message' => 'Mission updated successfully']);
    }

    // Delete a mission
    public function destroy($id)
    {
        $mission = Mission::find($id);
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
