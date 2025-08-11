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
            'manage-users',
            'manage-missions',
            'manage-vehicles',
            'view-reports'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'sanctum']);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'sanctum']);
        $adminRole->givePermissionTo(Permission::all());

        $agentRole = Role::create(['nome' => 'agent', 'guard_name' => 'sanctum']);
        $agentRole->givePermissionTo(['manage-missions', 'view-reports']);

        // Create admin user if not exists
        $admin = User::firstOrCreate(
            ['email' => 'admin@smarttrack.com'],
            [
                'matricule' => 'ADMIN001',
                'nom' => 'Admin',
                'prenom' => 'User',
                'mot_de_passe' => bcrypt('password123'),
                'role' => 'admin'
            ]
        );

        $admin->assignRole('admin');
    }
}
