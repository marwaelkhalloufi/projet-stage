<?php

namespace App\Http\Controllers;

use App\Models\Statistique;
use Illuminate\Http\Request;

class StatistiqueController extends Controller
{
    public function index()
    {
        return Statistique::all();
    }

    public function show($id)
    {
        return Statistique::findOrFail($id);
    }

    public function store(Request $request)
    {
        $statistique = Statistique::create($request->all());
        return response()->json($statistique, 201);
    }

    public function update(Request $request, $id)
    {
        $statistique = Statistique::findOrFail($id);
        $statistique->update($request->all());
        return response()->json($statistique);
    }

    public function destroy($id)
    {
        Statistique::destroy($id);
        return response()->json(null, 204);
    }
}
