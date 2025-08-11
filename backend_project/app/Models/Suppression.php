<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suppression extends Model
{
    protected $table = 'suppression';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'username',
        'password',
    ];
}
