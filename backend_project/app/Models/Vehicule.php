<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicule';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'matricule',
        'type',
        'disponible',
        'etat',
    ];
}
