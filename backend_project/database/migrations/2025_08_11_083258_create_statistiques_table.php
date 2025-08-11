<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration {
    public function up(): void {
        Schema::create('statistique', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->char('mois', 2)->nullable();
            $table->char('annee', 4)->nullable();
            $table->integer('nombre_missions')->nullable();
            $table->decimal('frais_total', 10, 2)->nullable();
            $table->json('villes_visitees')->nullable();
            $table->json('missions_par_statut')->nullable();
            $table->json('villes_plus_visitees')->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('statistique');
    }
};
