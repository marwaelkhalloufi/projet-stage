<?php

namespace App\Http\Controllers;

use App\Models\FraisMission;
use App\Models\Mission;
use App\Models\Statistique;
use Illuminate\Http\Request;

class StatistiqueController extends Controller
{
   public function index()
{
    // Example: aggregate missions, frais, dotation by month for the current year

    $missions = Mission::selectRaw("MONTHNAME(created_at) as month, COUNT(*) as value")
                       ->whereYear('created_at', now()->year)
                       ->groupBy('month')
                       ->orderByRaw('MONTH(created_at)')
                       ->get();

    $frais = FraisMission::selectRaw("MONTHNAME(created_at) as month, SUM(total) as value")
                         ->whereYear('created_at', now()->year)
                         ->groupBy('month')
                         ->orderByRaw('MONTH(created_at)')
                         ->get();


    return response()->json([
        'missions' => $missions,
        'frais' => $frais,

    ]);
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
