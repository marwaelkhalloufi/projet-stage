<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'matricule' => 'ADMIN001',
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@smarttrack.com',
            'mot_de_passe' => Hash::make('password123'),
            'role' => 'admin',
            'fonction' => 'Administrator',
            'college' => 'A'
        ]);

        // Create test agent user
        User::create([
            'matricule' => 'AGENT001',
            'nom' => 'Agent',
            'prenom' => 'Test',
            'email' => 'agent@smarttrack.com',
            'mot_de_passe' => Hash::make('password123'),
            'role' => 'agent',
            'fonction' => 'Field Agent',
            'college' => 'B'
        ]);
    }
}
