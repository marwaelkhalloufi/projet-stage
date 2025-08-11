<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('consultation', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('username', 100)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('profil', 50)->nullable();
            $table->dateTime('createdAt')->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('consultation');
    }
};
