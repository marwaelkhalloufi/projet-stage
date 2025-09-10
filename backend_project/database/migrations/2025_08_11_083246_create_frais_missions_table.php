<?php

// Migration: create_frais_missions_table.php (CORRECTED)
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFraisMissionsTable extends Migration
{
    public function up()
    {
        Schema::create('frais_missions', function (Blueprint $table) {
            $table->id();
            $table->string('type_frais'); // transport, hebergement, repas, etc.
            $table->decimal('montant', 10, 2);
            $table->date('date_frais');
            $table->text('description')->nullable();
            $table->string('justificatif')->nullable(); // path to receipt/document
            $table->string('statut')->default('en_attente'); // en_attente, approuve, rejete

            // Correct foreign key reference to 'missions' table (not 'mission')
            $table->foreignId('mission_id')->constrained('missions')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('frais_missions');
    }
}
