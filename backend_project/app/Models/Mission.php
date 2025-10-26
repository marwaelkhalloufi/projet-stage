<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'titre',
        'objet',
        'description',
        'direction',      // Your original field
        'destination',    // For tracking/map
        'date_debut',
        'date_fin',
        'budget_prevu',
        'agent_id',
        'vehicule_id',
        'user_id',
        'statut',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'budget_prevu' => 'decimal:2'
    ];

    /**
     * Get the frais for the mission
     */
    public function fraisMissions()
    {
        return $this->hasMany(FraisMission::class);
    }

    /**
     * Relationship with Agent
     */
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    /**
     * Relationship with Vehicule
     */
    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    /**
     * Relationship with User (creator)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with Tracking
     */
    public function tracking()
    {
        return $this->hasMany(Tracking::class);
    }

    /**
     * Get latest tracking for this mission
     */
    public function latestTracking()
    {
        return $this->hasOne(Tracking::class)->latestOfMany();
    }

    /**
     * Scope for active missions
     */
    public function scopeActive($query)
    {
        return $query->whereIn('statut', ['planifiee', 'en_cours']);
    }

    /**
     * Scope for completed missions
     */
    public function scopeCompleted($query)
    {
        return $query->where('statut', 'terminee');
    }

    /**
     * Check if mission is ongoing
     */
    public function isOngoing()
    {
        return $this->statut === 'en_cours';
    }

    /**
     * Check if mission is completed
     */
    public function isCompleted()
    {
        return $this->statut === 'terminee';
    }
}
