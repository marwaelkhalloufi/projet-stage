<?php

namespace App\Http\Controllers;

use App\Models\Creation;
use Illuminate\Http\Request;

class CreationController extends Controller
{
    public function index()
    {
        return Creation::all();
    }

    public function show($id)
    {
        return Creation::findOrFail($id);
    }

    public function store(Request $request)
    {
        $creation = Creation::create($request->all());
        return response()->json($creation, 201);
    }

    public function update(Request $request, $id)
    {
        $creation = Creation::findOrFail($id);
        $creation->update($request->all());
        return response()->json($creation);
    }

    public function destroy($id)
    {
        Creation::destroy($id);
        return response()->json(null, 204);
    }
}
