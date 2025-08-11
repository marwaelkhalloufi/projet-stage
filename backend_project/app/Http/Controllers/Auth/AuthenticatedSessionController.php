<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthenticatedSessionController extends Controller
{
    /**
     * Register a new user
     */
      public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'matricule' => 'required|string|unique:users',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'mot_de_passe' => 'required|string|min:8',
            'role' => 'required|string|in:admin,agent,gestionnaire,direction',
            'fonction' => 'nullable|string',
            'college' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create($request->all());

        // Assign role using Spatie
        $user->assignRole($request->role);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'permissions' => $user->permissions,
                'roles' => $user->role_names,
            ]
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'permissions' => $user->permissions,
                'roles' => $user->role_names,
            ]
        ]);
    }

    /**
     * Get authenticated user profile with permissions
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'permissions' => $user->permissions,
                'roles' => $user->role_names,
            ]
        ]);
    }

    /**
     * Check if user has specific permission
     */
    public function checkPermission(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'permission' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Permission name is required',
            ], 422);
        }

        $hasPermission = $request->user()->can($request->permission);

        return response()->json([
            'success' => true,
            'has_permission' => $hasPermission,
        ]);
    }
}
