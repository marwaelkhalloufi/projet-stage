<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles;

    protected $table = 'users';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'matricule',
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role', 
        'fonction',
        'college',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $appends = ['permissions', 'role_names'];

    // Override the password attribute name
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    // Mutator to hash password
    public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = Hash::make($value);
    }

    // Get user permissions for API responses
    public function getPermissionsAttribute()
    {
        return $this->getAllPermissions()->pluck('name')->toArray();
    }

    // Get role names for API responses
    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames()->toArray();
    }

    // Relationship with Agent
    public function agent()
    {
        return $this->hasOne(Agent::class, 'id', 'id');
    }
}
