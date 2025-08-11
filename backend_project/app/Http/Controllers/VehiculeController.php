<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    public function index()
    {
        return Vehicule::all();
    }

    public function show($id)
    {
        return Vehicule::findOrFail($id);
    }

    public function store(Request $request)
    {
        $vehicule = Vehicule::create($request->all());
        return response()->json($vehicule, 201);
    }

    public function update(Request $request, $id)
    {
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->update($request->all());
        return response()->json($vehicule);
    }

    public function destroy($id)
    {
        Vehicule::destroy($id);
        return response()->json(null, 204);
    }
}
