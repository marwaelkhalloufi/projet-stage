<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FraisMission extends Model
{
    protected $table = 'frais_mission';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'mission_id',
        'direction',
        'mois',
        'annee',
        'carburant',
        'indemnité',
        'total',
    ];
}
