<?php

// Migration: create_trackings_table.php (CORRECTED)
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrackingsTable extends Migration
{
    public function up()
    {
        Schema::create('trackings', function (Blueprint $table) {
            $table->id();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->timestamp('timestamp');
            $table->decimal('vitesse', 5, 2)->nullable();
            $table->integer('kilometrage')->nullable();
            $table->string('statut')->default('en_cours');

            // Correct foreign key reference to 'missions' table (not 'mission')
            $table->foreignId('mission_id')->constrained('missions')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('trackings');
    }
}
