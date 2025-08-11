<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    public function up(): void {
        Schema::create('vehicule', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('matricule', 20)->nullable();
            $table->string('type', 50)->nullable();
            $table->boolean('disponible')->default(true);
            $table->string('etat', 50)->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('vehicule');
    }
};
