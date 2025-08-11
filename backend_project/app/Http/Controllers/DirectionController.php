<?php

namespace App\Http\Controllers;

use App\Models\Direction;
use Illuminate\Http\Request;

class DirectionController extends Controller
{
    public function index()
    {
        return Direction::all();
    }

    public function show($id)
    {
        return Direction::findOrFail($id);
    }

    public function store(Request $request)
    {
        $direction = Direction::create($request->all());
        return response()->json($direction, 201);
    }

    public function update(Request $request, $id)
    {
        $direction = Direction::findOrFail($id);
        $direction->update($request->all());
        return response()->json($direction);
    }

    public function destroy($id)
    {
        Direction::destroy($id);
        return response()->json(null, 204);
    }
}
