<?php

namespace App\Http\Controllers;

use App\Models\FraisMission;
use App\Models\Mission;
use App\Models\Statistique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{



    public function index()
{
    // Fixed mission query
    $missions = Mission::selectRaw("MONTHNAME(created_at) as month, COUNT(*) as value")
                       ->whereYear('created_at', now()->year)
                       ->groupBy('month', DB::raw('MONTH(created_at)'))
                       ->orderByRaw('MONTH(created_at)')
                       ->get();

    // Fixed frais query
    $frais = FraisMission::selectRaw("MONTHNAME(created_at) as month, SUM(montant) as value")
                         ->whereYear('created_at', now()->year)
                         ->groupBy('month', DB::raw('MONTH(created_at)'))
                         ->orderByRaw('MONTH(created_at)')
                         ->get();

    return response()->json([
        'success' => true,
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
