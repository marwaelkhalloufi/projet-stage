<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('direction', function (Blueprint $table) {
            $table->string('id', 24)->primary();
            $table->string('sigle', 10)->nullable();
            $table->string('designation', 100)->nullable();
            $table->string('type', 50)->nullable();
        });
    }
    public function down(): void {
        Schema::dropIfExists('direction');
    }
};
