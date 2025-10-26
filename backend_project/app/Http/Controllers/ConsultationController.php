<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function index()
    {
        return Consultation::all();
    }

    public function show($id)
    {
        return Consultation::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
    'username' => 'required|string|max:255',
    'email' => 'required|email',
    'profil' => 'required|string'
]);
$consultation = Consultation::create($validated);
        return response()->json($consultation, 201);
    }

    public function update(Request $request, $id)
    {
        $consultation = Consultation::findOrFail($id);
        $consultation->update($request->all());
        return response()->json($consultation);
    }

    public function destroy($id)
    {
        Consultation::destroy($id);
        return response()->json(null, 204);
    }
}
