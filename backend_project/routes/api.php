<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\FraisMissionController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehiculeController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/login', [AuthenticatedSessionController::class, 'login']);
Route::post('/auth/register', [AuthenticatedSessionController::class, 'register']);

// Protected routes - only require authentication now
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/auth/profile', [AuthenticatedSessionController::class, 'profile']);
    Route::post('/auth/check-permission', [AuthenticatedSessionController::class, 'checkPermission']);
    Route::post('/auth/logout', [AuthenticatedSessionController::class, 'logout']);

    Route::get('/statistics', [StatistiqueController::class, 'index']);

    Route::prefix('frais-missions')->group(function () {
        Route::get('/', [FraisMissionController::class, 'index']);
        Route::post('/', [FraisMissionController::class, 'store']);
        Route::get('/{id}', [FraisMissionController::class, 'show']);
        Route::put('/{id}', [FraisMissionController::class, 'update']);
        Route::delete('/{id}', [FraisMissionController::class, 'destroy']);
    });

    // User Management (Admin only)
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Mission Management
    Route::get('/missions', [MissionController::class, 'index']);
    Route::post('/missions', [MissionController::class, 'store']);
    Route::put('/missions/{id}', [MissionController::class, 'update']);
    Route::put('/missions/{id}/validate', [MissionController::class, 'validate']);
    Route::put('/missions/{id}/assign', [MissionController::class, 'assign']);

    // Agent can only view/update their own missions
    Route::get('/missions/my-missions', [MissionController::class, 'myMissions']);

    // Vehicle Management
    Route::get('/vehicles', [VehiculeController::class, 'index']);
    Route::post('/vehicles', [VehiculeController::class, 'store']);
    Route::put('/vehicles/{id}', [VehiculeController::class, 'update']);
    Route::delete('/vehicles/{id}', [VehiculeController::class, 'destroy']);

    // Statistics (Direction and above)
    Route::get('/statistics', [StatistiqueController::class, 'index']);
    Route::get('/reports', [StatistiqueController::class, 'reports']);
    Route::get('/reports/export', [StatistiqueController::class, 'export']);

    // Role-based routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', function () {
            return response()->json(['message' => 'Admin Dashboard']);
        });
    });

    Route::middleware('role:gestionnaire|admin')->group(function () {
        Route::get('/management/dashboard', function () {
            return response()->json(['message' => 'Management Dashboard']);
        });
    });
});
