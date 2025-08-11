<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    public function up(): void {
        Schema::create('suppression', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('username', 100)->nullable();
            $table->text('password')->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('suppression');
    }
};
