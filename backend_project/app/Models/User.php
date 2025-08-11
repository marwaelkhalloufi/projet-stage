<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles, HasFactory;

    protected $table = 'users';
    public $timestamps = false;
    protected $guard_name = 'sanctum';

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role',
        'fonction',
        'college'
    ];

    protected $hidden = [
    'mot_de_passe', // Hide password in responses
    'remember_token',
];

    protected $appends = ['permissions', 'role_names'];

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    public function setMotDePasseAttribute($value)
    {
        if ($value) {
            $this->attributes['mot_de_passe'] = Hash::make($value);
        }
    }

    public function getPermissionsAttribute()
    {
        try {
            return $this->getAllPermissions()->pluck('name')->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }

    public function getRoleNamesAttribute()
    {
        try {
            return $this->getRoleNames()->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }

    public function agent()
    {
        return $this->hasOne(Agent::class, 'id', 'id');
    }

    // Helper method for API responses
    public function toAuthArray()
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'matricule' => $this->matricule,
            'nom' => $this->nom,
            'prenom' =>$this->prenom,
            'roles' => $this->role,
            'permissions' => $this->permissions,
            'agent' => $this->agent,
        ];
    }
}
