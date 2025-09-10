<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\Direction;
use App\Models\Mission;
use App\Models\User;
use App\Models\Vehicule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {


         User::create([
            'matricule' => 'ADMIN001',
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@smarttrack.com',
            'mot_de_passe' => 'password123',
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
            'mot_de_passe' => 'password123',
            'role' => 'agent',
            'fonction' => 'Field Agent',
            'college' => 'B'
        ]);
        // First, let's check what columns exist in each table
        $vehiculeColumns = Schema::getColumnListing('vehicules');
        $agentColumns = Schema::getColumnListing('agents');

        echo "Vehicule table columns: " . implode(', ', $vehiculeColumns) . "\n";
        echo "Agent table columns: " . implode(', ', $agentColumns) . "\n";

        // Create Directions
        if (Schema::hasTable('directions')) {
            $directions = [
                ['sigle' => 'DRH', 'designation' => 'Direction des Ressources Humaines', 'type' => 'Direction'],
                ['sigle' => 'DIT', 'designation' => 'Direction des Technologies de l\'Information', 'type' => 'Direction'],
                ['sigle' => 'DAF', 'designation' => 'Direction Administrative et Financière', 'type' => 'Direction'],
                ['sigle' => 'DOP', 'designation' => 'Direction des Opérations', 'type' => 'Direction'],
            ];

            foreach ($directions as $direction) {
                Direction::create($direction);
            }
        }

        // Create Agents - only use columns that exist
        if (Schema::hasTable('agents')) {
            $agents = [
                [
                    'matricule' => 'A001',
                    'nom_prenom' => 'Ahmed Bennani',
                    'sigle' => 'AB',
                    'fonction' => 'Inspecteur',
                    'college' => 'Cadres',
                    'direction_id' => 1
                ],
                [
                    'matricule' => 'A002',
                    'nom_prenom' => 'Fatima Alaoui',
                    'sigle' => 'FA',
                    'fonction' => 'Contrôleur',
                    'college' => 'Cadres',
                    'direction_id' => 2
                ],
                [
                    'matricule' => 'A003',
                    'nom_prenom' => 'Mohamed Tazi',
                    'sigle' => 'MT',
                    'fonction' => 'Analyste',
                    'college' => 'Cadres',
                    'direction_id' => 3
                ],
                [
                    'matricule' => 'A004',
                    'nom_prenom' => 'Aicha Idrissi',
                    'sigle' => 'AI',
                    'fonction' => 'Chef de Service',
                    'college' => 'Cadres Supérieurs',
                    'direction_id' => 4
                ],
                [
                    'matricule' => 'A005',
                    'nom_prenom' => 'Youssef Chakir',
                    'sigle' => 'YC',
                    'fonction' => 'Inspecteur Principal',
                    'college' => 'Cadres Supérieurs',
                    'direction_id' => 1
                ],
            ];

            foreach ($agents as $agent) {
                // Only include fields that exist in the table
                $filteredAgent = [];
                foreach ($agent as $key => $value) {
                    if (in_array($key, $agentColumns)) {
                        $filteredAgent[$key] = $value;
                    }
                }
                Agent::create($filteredAgent);
            }
        }

        // Create Vehicles using correct field names
        if (Schema::hasTable('vehicules')) {
            $vehicules = [
                [
                    'immatriculation' => '123456-A-12',
                    'marque' => 'Dacia',
                    'modele' => 'Logan',
                    'annee' => 2020,
                    'type_carburant' => 'Essence',
                    'consommation_moyenne' => 7.5
                ],
                [
                    'immatriculation' => '789012-B-34',
                    'marque' => 'Renault',
                    'modele' => 'Clio',
                    'annee' => 2019,
                    'type_carburant' => 'Diesel',
                    'consommation_moyenne' => 5.2
                ],
                [
                    'immatriculation' => '345678-C-56',
                    'marque' => 'Peugeot',
                    'modele' => '208',
                    'annee' => 2021,
                    'type_carburant' => 'Essence',
                    'consommation_moyenne' => 6.8
                ],
                [
                    'immatriculation' => '901234-D-78',
                    'marque' => 'Toyota',
                    'modele' => 'Yaris',
                    'annee' => 2022,
                    'type_carburant' => 'Hybride',
                    'consommation_moyenne' => 4.5
                ],
                [
                    'immatriculation' => '567890-E-90',
                    'marque' => 'Hyundai',
                    'modele' => 'i10',
                    'annee' => 2023,
                    'type_carburant' => 'Essence',
                    'consommation_moyenne' => 5.8
                ],
            ];

            foreach ($vehicules as $vehicule) {
                Vehicule::create($vehicule);
            }
        }

        // Create Sample Missions - only if agents and missions table exist
        if (Schema::hasTable('missions') && Schema::hasTable('agents')) {
            $missions = [
                [
                    'objet' => 'Mission de contrôle fiscal à Casablanca',
                    'date_debut' => '2024-10-15',
                    'date_fin' => '2024-10-18',
                    'destination' => 'casablanca',
                    'description' => 'Contrôle des entreprises industrielles de la zone de Casablanca',
                    'budget_prevu' => 2500.00,
                    'agent_id' => 1,
                    'vehicule_id' => 1,
                    'statut' => 'planifiee'
                ],
                [
                    'objet' => 'Formation en audit interne',
                    'date_debut' => '2024-10-20',
                    'date_fin' => '2024-10-22',
                    'destination' => 'rabat',
                    'description' => 'Participation à une formation spécialisée en audit interne',
                    'budget_prevu' => 1200.00,
                    'agent_id' => 2,
                    'vehicule_id' => null,
                    'statut' => 'en_cours'
                ],
                [
                    'objet' => 'Inspection des services déconcentrés',
                    'date_debut' => '2024-09-10',
                    'date_fin' => '2024-09-15',
                    'destination' => 'fes',
                    'description' => 'Inspection générale des services déconcentrés de la région de Fès',
                    'budget_prevu' => 3000.00,
                    'agent_id' => 3,
                    'vehicule_id' => 2,
                    'statut' => 'terminee'
                ],
            ];

            foreach ($missions as $mission) {
                Mission::create($mission);
            }
        }
    }
}
