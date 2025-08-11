<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('frais_mission', function (Blueprint $table) {
            $table->id();
            $table->string('mission_id', 24)->nullable();
            $table->string('direction', 100)->nullable();
            $table->string('mois', 20)->nullable();
            $table->char('annee', 4)->nullable();
            $table->decimal('carburant', 10, 2)->nullable();
            $table->decimal('indemnité', 10, 2)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->foreign('mission_id')->references('id')->on('mission')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('frais_mission');
    }
};
