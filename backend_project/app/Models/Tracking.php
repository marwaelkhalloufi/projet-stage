<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    // Correct table name based on your migration
    protected $table = 'trackings';

    public $timestamps = false;

    protected $fillable = [
        'vehicule_id',
        'mission_id',
        'latitude',
        'longitude',
        'etat_voiture',
        'ville',
        'timestamp',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'timestamp' => 'datetime',
    ];

    /**
     * Relationship with Vehicule
     */
    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    /**
     * Relationship with Mission
     */
    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }

    /**
     * Scope to get only conforme vehicles
     */
    public function scopeConforme($query)
    {
        return $query->where('etat_voiture', 'conforme');
    }

    /**
     * Scope to get only anomalie vehicles
     */
    public function scopeAnomalie($query)
    {
        return $query->where('etat_voiture', 'anomalie');
    }

    /**
     * Get latest tracking for each vehicle
     */
    public static function getLatestForVehicles()
    {
        return self::whereIn('id', function($query) {
            $query->selectRaw('MAX(id)')
                ->from('trackings')
                ->groupBy('vehicule_id');
        })->with(['vehicule', 'mission'])->get();
    }
}
