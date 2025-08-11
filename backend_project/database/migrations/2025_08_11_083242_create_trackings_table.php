<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('tracking', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('mission_id', 24);
            $table->decimal('latitude', 9, 6)->nullable();
            $table->decimal('longitude', 9, 6)->nullable();
            $table->string('etat_voiture', 20)->nullable();
            $table->dateTime('timestamp')->nullable();
            $table->foreign('mission_id')->references('id')->on('mission')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('tracking');
    }
};
