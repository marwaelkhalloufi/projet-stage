<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('matricule', 20)->nullable();
            $table->string('nom', 50)->nullable();
            $table->string('prenom', 50)->nullable();
            $table->string('email', 150)->nullable();
            $table->text('mot_de_passe')->nullable();
            $table->string('role', 50)->nullable();
            $table->string('fonction', 100)->nullable();
            $table->string('college', 100)->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('users');
    }
};
