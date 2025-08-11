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

    public function agent()
{
    return $this->belongsTo(User::class, 'agent_id');
}

public function vehicule()
{
    return $this->belongsTo(Vehicule::class, 'vehicule_id');
}
}
