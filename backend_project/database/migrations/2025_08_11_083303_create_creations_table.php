<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('creation', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('username', 100)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('profileType', 50)->nullable();
            $table->text('passwordHash')->nullable();
            $table->dateTime('createdAt')->nullable();
            $table->dateTime('updatedAt')->nullable();
            $table->boolean('isDeleted')->default(false);
        });
    }
    public function down(): void {
        Schema::dropIfExists('creation');
    }
};
