<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    protected $table = 'agents';
    public $timestamps = false;

    protected $fillable = [
        'matricule',
        'nom_prenom',
        'sigle',
        'fonction',
        'college',
        'direction_id',
    ];

    // Relationship with Direction
   
    public function direction()
{
    return $this->belongsTo(Direction::class);
}

    // Relationship with Missions
    public function missions()
    {
        return $this->hasMany(Mission::class);
    }

    // Scope for active agents
    public function scopeActive($query)
    {
        return $query->whereNotNull('matricule');
    }

    // Get agent's full display name
    public function getDisplayNameAttribute()
    {
        return $this->nom_prenom . ' (' . $this->matricule . ')';
    }

    // Check if agent is available for a mission on specific dates
    public function isAvailableForDates($dateDebut, $dateFin, $excludeMissionId = null)
    {
        $query = $this->missions()
            ->where('statut', '!=', 'annulee')
            ->where(function($q) use ($dateDebut, $dateFin) {
                $q->whereBetween('date_debut', [$dateDebut, $dateFin])
                  ->orWhereBetween('date_fin', [$dateDebut, $dateFin])
                  ->orWhere(function($q2) use ($dateDebut, $dateFin) {
                      $q2->where('date_debut', '<=', $dateDebut)
                         ->where('date_fin', '>=', $dateFin);
                  });
            });

        if ($excludeMissionId) {
            $query->where('id', '!=', $excludeMissionId);
        }

        return $query->count() === 0;
    }
}
