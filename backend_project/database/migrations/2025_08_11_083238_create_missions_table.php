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

            // Main fields
            $table->string('titre')->nullable(); // Mission title
            $table->string('objet'); // Mission subject/purpose
            $table->text('description')->nullable(); // Detailed description
            $table->string('direction')->nullable(); // Your original direction field
            $table->string('destination'); // Destination city for tracking

            // Dates
            $table->date('date_debut');
            $table->date('date_fin');

            // Budget
            $table->decimal('budget_prevu', 10, 2)->nullable();

            // Relationships
            $table->unsignedBigInteger('agent_id');
            $table->unsignedBigInteger('vehicule_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // User who created the mission

            // Status
            $table->enum('statut', ['planifiee', 'en_cours', 'terminee', 'annulee'])->default('planifiee');

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraints
            $table->foreign('agent_id')
                  ->references('id')
                  ->on('agents')
                  ->onDelete('cascade');

            $table->foreign('vehicule_id')
                  ->references('id')
                  ->on('vehicules')
                  ->onDelete('set null');

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');

            // Indexes for better performance
            $table->index(['statut', 'date_debut']);
            $table->index('agent_id');
            $table->index('vehicule_id');
            $table->index('user_id');
            $table->index('destination');
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
