<?php

namespace App\Http\Controllers;

use App\Models\Modifier;
use Illuminate\Http\Request;

class ModifierController extends Controller
{
    public function index()
    {
        return Modifier::all();
    }

    public function show($id)
    {
        return Modifier::findOrFail($id);
    }

    public function store(Request $request)
    {
        $modifier = Modifier::create($request->all());
        return response()->json($modifier, 201);
    }

    public function update(Request $request, $id)
    {
        $modifier = Modifier::findOrFail($id);
        $modifier->update($request->all());
        return response()->json($modifier);
    }

    public function destroy($id)
    {
        Modifier::destroy($id);
        return response()->json(null, 204);
    }
}
