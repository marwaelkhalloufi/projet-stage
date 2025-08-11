<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    protected $table = 'tracking';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'mission_id',
        'latitude',
        'longitude',
        'etat_voiture',
        'timestamp',
    ];
}
