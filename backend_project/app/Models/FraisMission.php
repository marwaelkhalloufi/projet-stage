<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FraisMission extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_frais',
        'montant',
        'date_frais',
        'description',
        'justificatif',
        'statut',
        'mission_id'
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'date_frais' => 'date'
    ];

    /**
     * Get the mission that owns the frais
     */
    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }

    /**
     * Scope for filtering by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('statut', $status);
    }

    /**
     * Scope for filtering by date range
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date_frais', [$startDate, $endDate]);
    }

    /**
     * Scope for filtering by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type_frais', $type);
    }
}
