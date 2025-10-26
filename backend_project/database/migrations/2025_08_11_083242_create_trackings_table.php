<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trackings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vehicule_id');
            $table->unsignedBigInteger('mission_id')->nullable(); // IMPORTANT: Make it nullable
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->enum('etat_voiture', ['conforme', 'anomalie'])->default('conforme');
            $table->string('ville')->nullable();
            $table->timestamp('timestamp')->useCurrent();

            // Foreign keys
            $table->foreign('vehicule_id')
                  ->references('id')
                  ->on('vehicules')
                  ->onDelete('cascade');

            $table->foreign('mission_id')
                  ->references('id')
                  ->on('missions')
                  ->onDelete('set null');

            // Indexes for better performance
            $table->index('vehicule_id');
            $table->index('mission_id');
            $table->index('timestamp');
            $table->index('etat_voiture');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackings');
    }
};
