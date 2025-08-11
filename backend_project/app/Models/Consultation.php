<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $table = 'consultation';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'username',
        'email',
        'profil',
        'createdAt',
    ];
}
