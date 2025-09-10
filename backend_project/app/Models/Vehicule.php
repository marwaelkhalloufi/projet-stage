<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicules';
    public $timestamps = false;

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'type',
        'disponible',
        'etat'
    ];

    public function missions()
    {
        return $this->hasMany(Mission::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('disponible', true);
    }
}
