<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User Management
            'create-users',
            'read-users',
            'update-users',
            'delete-users',

            // Vehicle Management
            'create-vehicles',
            'read-vehicles',
            'update-vehicles',
            'delete-vehicles',
            'manage-vehicle-availability',

            // Mission Management
            'create-missions',
            'read-missions',
            'update-missions',
            'delete-missions',
            'validate-missions',
            'assign-missions',
            'view-own-missions',
            'update-own-missions',
            'report-anomalies',

            // Tracking & Monitoring
            'create-tracking',
            'read-tracking',
            'update-tracking',
            'view-own-tracking',

            // Financial Management
            'create-frais',
            'read-frais',
            'update-frais',
            'delete-frais',
            'validate-frais',

            // Statistics & Reports
            'view-statistics',
            'view-reports',
            'export-reports',

            // Direction Management
            'manage-directions',

            // System Administration
            'system-administration',
            'view-all-data',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Admin Role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all()); // Admin gets all permissions

        // Agent Role
        $agentRole = Role::create(['name' => 'agent']);
        $agentRole->givePermissionTo([
            'view-own-missions',
            'update-own-missions',
            'report-anomalies',
            'create-tracking',
            'view-own-tracking',
            'update-tracking',
            'read-vehicles', // Can view vehicles for missions
        ]);

        // Gestionnaire Role
        $gestionnaireRole = Role::create(['name' => 'gestionnaire']);
        $gestionnaireRole->givePermissionTo([
            'read-users',
            'read-vehicles',
            'update-vehicles',
            'manage-vehicle-availability',
            'read-missions',
            'update-missions',
            'validate-missions',
            'assign-missions',
            'read-tracking',
            'create-frais',
            'read-frais',
            'update-frais',
            'validate-frais',
            'view-statistics',
        ]);

        // Direction Role
        $directionRole = Role::create(['name' => 'direction']);
        $directionRole->givePermissionTo([
            'read-users',
            'read-vehicles',
            'read-missions',
            'read-tracking',
            'read-frais',
            'view-statistics',
            'view-reports',
            'export-reports',
            'view-all-data',
        ]);

        // Create default admin user (optional)
        $adminUser = User::create([
            'matricule' => 'ADMIN001',
            'nom' => 'Super',
            'prenom' => 'Admin',
            'email' => 'admin@smarttrack.com',
            'mot_de_passe' => 'password123',
            'role' => 'admin',
        ]);
        $adminUser->assignRole('admin');
    }
}
