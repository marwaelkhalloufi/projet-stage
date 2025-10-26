<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicules';

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'annee',
        'type_carburant',
        'consommation_moyenne',
    ];

    protected $casts = [
        'annee' => 'integer',
        'consommation_moyenne' => 'decimal:2',
    ];

    /**
     * Relationship with Missions
     */
    public function missions()
    {
        return $this->hasMany(Mission::class);
    }

    /**
     * Relationship with Tracking
     */
    public function tracking()
    {
        return $this->hasMany(Tracking::class);
    }

    /**
     * Get latest tracking for this vehicle
     */
    public function latestTracking()
    {
        return $this->hasOne(Tracking::class)->latestOfMany('timestamp');
    }

    /**
     * Get current active mission
     */
    public function currentMission()
    {
        return $this->hasOne(Mission::class)
            ->whereIn('statut', ['en_cours', 'planifie'])
            ->latest('date_debut');
    }

    /**
     * Scope for available vehicles
     */
    public function scopeAvailable($query)
    {
        return $query->whereDoesntHave('missions', function($q) {
            $q->whereIn('statut', ['en_cours', 'planifie']);
        });
    }
}
