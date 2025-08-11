<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistique extends Model
{
    protected $table = 'statistique';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'mois',
        'annee',
        'nombre_missions',
        'frais_total',
        'villes_visitees',
        'missions_par_statut',
        'villes_plus_visitees',
    ];

    protected $casts = [
        'villes_visitees' => 'array',
        'missions_par_statut' => 'array',
        'villes_plus_visitees' => 'array',
    ];
}
