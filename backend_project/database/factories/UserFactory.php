<?php

// database/factories/UserFactory.php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'matricule' => 'AG' . $this->faker->unique()->numberBetween(1000, 9999),
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'mot_de_passe' => 'password123',
            'role' => 'agent',
            'fonction' => $this->faker->jobTitle,
            'college' => $this->faker->randomElement(['A', 'B', 'C']),

        ];
    }

    public function admin()
    {
        return $this->state([
            'matricule' => 'ADMIN001',
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@smarttrack.com',
            'role' => 'admin',
            'fonction' => 'Administrator',
            'college' => 'A'
        ]);
    }
}
