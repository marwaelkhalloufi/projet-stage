<?php



use App\Http\Controllers\Api\AuthenticatedSessionController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehiculeController;
use Illuminate\Support\Facades\Route;






// Public routes
Route::post('/auth/register', [AuthenticatedSessionController::class, 'register']);
Route::post('/auth/login', [AuthenticatedSessionController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/auth/profile', [AuthenticatedSessionController::class, 'profile']);
    Route::post('/auth/check-permission', [AuthenticatedSessionController::class, 'checkPermission']);
    Route::post('/auth/logout', [AuthenticatedSessionController::class, 'logout']);

    // User Management (Admin only)
    Route::middleware('permission:create-users')->post('/users', [UserController::class, 'store']);
    Route::middleware('permission:read-users')->get('/users', [UserController::class, 'index']);
    Route::middleware('permission:update-users')->put('/users/{id}', [UserController::class, 'update']);
    Route::middleware('permission:delete-users')->delete('/users/{id}', [UserController::class, 'destroy']);

    // Mission Management
    Route::middleware('permission:read-missions')->get('/missions', [MissionController::class, 'index']);
    Route::middleware('permission:create-missions')->post('/missions', [MissionController::class, 'store']);
    Route::middleware('permission:update-missions')->put('/missions/{id}', [MissionController::class, 'update']);
    Route::middleware('permission:validate-missions')->put('/missions/{id}/validate', [MissionController::class, 'validate']);
    Route::middleware('permission:assign-missions')->put('/missions/{id}/assign', [MissionController::class, 'assign']);

    // Agent can only view/update their own missions
    Route::middleware('permission:view-own-missions')->get('/missions/my-missions', [MissionController::class, 'myMissions']);

    // Vehicle Management
    Route::middleware('permission:read-vehicles')->get('/vehicles', [VehiculeController::class, 'index']);
    Route::middleware('permission:create-vehicles')->post('/vehicles', [VehiculeController::class, 'store']);
    Route::middleware('permission:update-vehicles')->put('/vehicles/{id}', [VehiculeController::class, 'update']);
    Route::middleware('permission:delete-vehicles')->delete('/vehicles/{id}', [VehiculeController::class, 'destroy']);

    // Statistics (Direction and above)
    Route::middleware('permission:view-statistics')->get('/statistics', [StatistiqueController::class, 'index']);
    Route::middleware('permission:view-reports')->get('/reports', [StatistiqueController::class, 'reports']);
    Route::middleware('permission:export-reports')->get('/reports/export', [StatistiqueController::class, 'export']);

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
