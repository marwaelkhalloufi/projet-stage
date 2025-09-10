<?php

namespace App\Http\Controllers;

use App\Models\Direction;
use Illuminate\Http\Request;

class DirectionController extends Controller
{
    public function index()
    {
        return Direction::with('agents')->get();
    }

    public function show($id)
    {
        return Direction::with('agents')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sigle' => 'required|string|unique:directions,sigle',
            'designation' => 'required|string',
            'type' => 'required|string',
        ]);

        $direction = Direction::create($request->all());
        return response()->json($direction, 201);
    }

    public function update(Request $request, $id)
    {
        $direction = Direction::findOrFail($id);

        $request->validate([
            'sigle' => 'required|string|unique:directions,sigle,' . $id,
            'designation' => 'required|string',
            'type' => 'required|string',
        ]);

        $direction->update($request->all());
        return response()->json($direction);
    }

    public function destroy($id)
    {
        Direction::destroy($id);
        return response()->json(null, 204);
    }
}
