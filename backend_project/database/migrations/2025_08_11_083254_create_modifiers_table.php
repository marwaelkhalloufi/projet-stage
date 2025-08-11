<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    public function up(): void {
        Schema::create('modifier', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('username', 100)->nullable();
            $table->text('ancien_mot_de_passe')->nullable();
            $table->text('nouveau_mot_de_passe')->nullable();
            $table->dateTime('date_modification')->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('modifier');
    }
};
