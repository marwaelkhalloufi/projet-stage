<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $table = 'directions';
    public $timestamps = true; 

    protected $fillable = [
        'sigle',
        'designation',
        'type',
    ];

    // Relationship with Agents
    public function agents()
    {
        return $this->hasMany(Agent::class);
    }
}
