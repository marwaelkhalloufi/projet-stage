<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicule;
use App\Models\Tracking;
use App\Models\Mission;

class TrackingSeeder extends Seeder
{
    // Moroccan cities with coordinates
    private $moroccanCities = [
        'Casablanca' => ['lat' => 33.5731, 'lng' => -7.5898],
        'Rabat' => ['lat' => 34.0209, 'lng' => -6.8416],
        'Fès' => ['lat' => 34.0333, 'lng' => -5.0000],
        'Marrakech' => ['lat' => 31.6295, 'lng' => -7.9811],
        'Tanger' => ['lat' => 35.7595, 'lng' => -5.8340],
        'Agadir' => ['lat' => 30.4278, 'lng' => -9.5981],
        'Meknès' => ['lat' => 33.8935, 'lng' => -5.5473],
        'Oujda' => ['lat' => 34.6814, 'lng' => -1.9086],
        'Tétouan' => ['lat' => 35.5889, 'lng' => -5.3626],
        'Safi' => ['lat' => 32.2994, 'lng' => -9.2372],
        'El Jadida' => ['lat' => 33.2316, 'lng' => -8.5007],
        'Nador' => ['lat' => 35.1681, 'lng' => -2.9333],
        'Khouribga' => ['lat' => 32.8861, 'lng' => -6.9063],
    ];

    public function run()
    {
        // Get all vehicles
        $vehicules = Vehicule::all();

        if ($vehicules->isEmpty()) {
            $this->command->warn('No vehicles found. Please seed vehicles first.');
            return;
        }

        $cities = array_keys($this->moroccanCities);

        foreach ($vehicules as $vehicule) {
            // Get random city
            $cityName = $cities[array_rand($cities)];
            $cityCoords = $this->moroccanCities[$cityName];

            // Add some random offset to coordinates (within ~5km)
            $latOffset = (rand(-100, 100) / 1000); // ±0.1 degrees
            $lngOffset = (rand(-100, 100) / 1000);

            // Find if vehicle has an active mission
            $mission = Mission::where('vehicule_id', $vehicule->id)
                ->whereIn('statut', ['en_cours', 'planifie'])
                ->first();

            // If mission exists, use its destination
            if ($mission && $mission->destination) {
                $cityName = $mission->destination;
                // Try to get coordinates for this city
                if (isset($this->moroccanCities[$cityName])) {
                    $cityCoords = $this->moroccanCities[$cityName];
                }
            }

            // Randomly determine vehicle state (70% conforme, 30% anomalie)
            $etat = rand(1, 10) <= 7 ? 'conforme' : 'anomalie';

            // Create tracking record
            Tracking::create([
                'vehicule_id' => $vehicule->id,
                'mission_id' => $mission ? $mission->id : null,
                'latitude' => $cityCoords['lat'] + $latOffset,
                'longitude' => $cityCoords['lng'] + $lngOffset,
                'etat_voiture' => $etat,
                'ville' => $cityName,
                'timestamp' => now()->subMinutes(rand(0, 120)), // Random time in last 2 hours
            ]);

            $this->command->info("Created tracking for vehicle: {$vehicule->immatriculation} in {$cityName}");
        }

        $this->command->info('Tracking data seeded successfully!');
    }
}
