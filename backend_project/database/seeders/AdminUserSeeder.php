<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing admin user if exists
        User::where('email', 'admin@smarttrack.com')->delete();

        // Create new admin user
        $admin = User::create([
            'matricule' => 'ADM001',
            'nom' => 'Admin',
            'prenom' => 'System',
            'email' => 'admin@smarttrack.com',
            'mot_de_passe' => 'password123', // Will be hashed by mutator
            'role' => 'admin',
            'fonction' => 'Administrator',
            'college' => null
        ]);

        // Assign admin role if using Spatie
        if (class_exists('\Spatie\Permission\Models\Role')) {
            try {
                $admin->assignRole('admin');
            } catch (\Exception $e) {
                // Role might not exist yet
                Log::warning('Could not assign admin role: ' . $e->getMessage());
            }
        }

        echo "Admin user created successfully!\n";
        echo "Email: admin@smarttrack.com\n";
        echo "Password: password123\n";
    }
}
