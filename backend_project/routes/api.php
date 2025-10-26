<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\FraisMissionController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\TrackingController;
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

    // Statistics
    Route::get('/statistics', [StatistiqueController::class, 'index']);
    Route::get('/reports', [StatistiqueController::class, 'reports']);
    Route::get('/reports/export', [StatistiqueController::class, 'export']);

    // Frais Missions - consolidated routes
    Route::apiResource('frais-missions', FraisMissionController::class);
    Route::get('frais-missions/status/{status}', [FraisMissionController::class, 'getByStatus']);

    // User Management
    Route::apiResource('users', UserController::class);

    // Agents and Vehicles
    Route::apiResource('agents', AgentController::class);

    // IMPORTANT: Put specific routes BEFORE apiResource
    Route::get('vehicules/map-data', [VehiculeController::class, 'getMapData']); // NEW - for map
    Route::apiResource('vehicules', VehiculeController::class);

    // Missions
    Route::prefix('missions')->group(function () {
        Route::get('/', [MissionController::class, 'index']);
        Route::post('/', [MissionController::class, 'store']);
        Route::get('/dropdown-data', [MissionController::class, 'getDropdownData']);
        Route::get('/search/{id}', [MissionController::class, 'search']);
        Route::get('/{id}', [MissionController::class, 'show']);
        Route::put('/{id}', [MissionController::class, 'update']);
        Route::delete('/{id}', [MissionController::class, 'destroy']);
    });

    // Tracking routes
    Route::get('/tracking', [TrackingController::class, 'index']);
    Route::get('/tracking/latest', [TrackingController::class, 'getLatestTracking']);
    Route::get('/tracking/{id}', [TrackingController::class, 'show']);
    Route::get('/tracking/mission/{missionId}', [TrackingController::class, 'getByMission']);
    Route::post('/tracking', [TrackingController::class, 'store']);
    Route::put('/tracking/{id}', [TrackingController::class, 'update']);
    Route::delete('/tracking/{id}', [TrackingController::class, 'destroy']);

    // Directions
    Route::apiResource('directions', DirectionController::class);

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
