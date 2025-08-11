<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Creation extends Model
{
    protected $table = 'creation';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'username',
        'email',
        'profileType',
        'passwordHash',
        'createdAt',
        'updatedAt',
        'isDeleted',
    ];
}
