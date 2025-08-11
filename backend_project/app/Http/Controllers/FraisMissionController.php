<?php

namespace App\Http\Controllers;

use App\Models\FraisMission;
use Illuminate\Http\Request;

class FraisMissionController extends Controller
{
    public function index()
    {
        return FraisMission::all();
    }

    public function show($id)
    {
        return FraisMission::findOrFail($id);
    }

    public function store(Request $request)
    {
        $fraisMission = FraisMission::create($request->all());
        return response()->json($fraisMission, 201);
    }

    public function update(Request $request, $id)
    {
        $fraisMission = FraisMission::findOrFail($id);
        $fraisMission->update($request->all());
        return response()->json($fraisMission);
    }

    public function destroy($id)
    {
        FraisMission::destroy($id);
        return response()->json(null, 204);
    }
}
