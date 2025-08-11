<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // If user can view all data, return all missions
        if ($user->can('view-all-data')) {
            $missions = Mission::with(['agent', 'vehicule'])->get();
        }
        // If user can only view own missions
        elseif ($user->can('view-own-missions')) {
            $missions = Mission::where('agent_id', $user->id)->with(['agent', 'vehicule'])->get();
        }
        // If user has read missions permission (gestionnaire)
        elseif ($user->can('read-missions')) {
            $missions = Mission::with(['agent', 'vehicule'])->get();
        }
        else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $missions
        ]);
    }

    public function myMissions(Request $request)
    {
        $missions = Mission::where('agent_id', $request->user()->id)
                          ->with(['agent', 'vehicule'])
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $missions
        ]);
    }

    public function validate(Request $request, $id)
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
