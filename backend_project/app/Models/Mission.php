<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    protected $table = 'mission';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'numero_mission',
        'objet',
        'date_debut',
        'date_fin',
        'trajet',
        'agent_id',
        'vehicule_id',
        'statut',
        'anomalie',
    ];
}
