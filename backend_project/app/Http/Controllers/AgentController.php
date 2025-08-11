<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
        return Agent::all();
    }

    public function show($id)
    {
        return Agent::findOrFail($id);
    }

    public function store(Request $request)
    {
        $agent = Agent::create($request->all());
        return response()->json($agent, 201);
    }

    public function update(Request $request, $id)
    {
        $agent = Agent::findOrFail($id);
        $agent->update($request->all());
        return response()->json($agent);
    }

    public function destroy($id)
    {
        Agent::destroy($id);
        return response()->json(null, 204);
    }
}
