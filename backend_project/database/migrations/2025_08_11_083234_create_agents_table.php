<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('agents', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('direction_id', 24);
            $table->foreign('direction_id')->references('id')->on('direction')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('agents');
    }
};
