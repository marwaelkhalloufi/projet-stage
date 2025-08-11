<?php

namespace App\Http\Controllers;

use App\Models\Suppression;
use Illuminate\Http\Request;

class SuppressionController extends Controller
{
    public function index()
    {
        return Suppression::all();
    }

    public function show($id)
    {
        return Suppression::findOrFail($id);
    }

    public function store(Request $request)
    {
        $suppression = Suppression::create($request->all());
        return response()->json($suppression, 201);
    }

    public function update(Request $request, $id)
    {
        $suppression = Suppression::findOrFail($id);
        $suppression->update($request->all());
        return response()->json($suppression);
    }

    public function destroy($id)
    {
        Suppression::destroy($id);
        return response()->json(null, 204);
    }
}
