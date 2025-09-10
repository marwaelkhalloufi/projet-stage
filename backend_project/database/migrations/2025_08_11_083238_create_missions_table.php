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
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('objet');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->string('destination');
            $table->text('description')->nullable();
            $table->decimal('budget_prevu', 10, 2)->nullable();
            $table->unsignedBigInteger('agent_id');
            $table->unsignedBigInteger('vehicule_id')->nullable();
            $table->enum('statut', ['planifiee', 'en_cours', 'terminee', 'annulee'])->default('planifiee');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraints - using correct table names
            $table->foreign('agent_id')->references('id')->on('agents')->onDelete('cascade');
            $table->foreign('vehicule_id')->references('id')->on('vehicules')->onDelete('set null');

            // Indexes for better performance
            $table->index(['statut', 'date_debut']);
            $table->index('agent_id');
            $table->index('vehicule_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('missions');
    }
};
