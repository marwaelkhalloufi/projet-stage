<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $table = 'direction';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'sigle',
        'designation',
        'type',
    ];
}
