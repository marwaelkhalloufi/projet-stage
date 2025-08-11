<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('mission', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('numero_mission', 20)->nullable();
            $table->string('objet', 150)->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->string('trajet', 150)->nullable();
            $table->string('agent_id', 24);
            $table->string('vehicule_id', 24);
            $table->string('statut', 50)->nullable();
            $table->boolean('anomalie')->default(false);
            $table->foreign('agent_id')->references('id')->on('agents')->onDelete('cascade');
            $table->foreign('vehicule_id')->references('id')->on('vehicule')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('mission');
    }
};
