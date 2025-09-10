<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'direction',
        'date_debut',
        'date_fin',
        'statut',
        'user_id'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date'
    ];

    /**
     * Get the frais for the mission
     */
    public function fraisMissions()
    {
        return $this->hasMany(FraisMission::class);
    }

    // Relationship with Agent (singular)
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    // Relationship with Vehicule (singular)
    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }
}
