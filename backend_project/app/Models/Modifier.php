<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modifier extends Model
{
    protected $table = 'modifier';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'username',
        'ancien_mot_de_passe',
        'nouveau_mot_de_passe',
        'date_modification',
    ];
}
