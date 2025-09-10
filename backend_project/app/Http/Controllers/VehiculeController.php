<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
   public function index()
{
    try {
        $vehicules = Vehicule::all();

        return response()->json([
            'success' => true,
            'data' => $vehicules
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des véhicules',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
