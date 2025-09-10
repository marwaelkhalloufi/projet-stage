<?php

// Migration 3: create_agents_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration
{
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id(); // This creates unsignedBigInteger primary key
            $table->string('matricule')->unique();
            $table->string('nom_prenom');
            $table->string('sigle');
            $table->string('fonction');
            $table->string('college');
            $table->foreignId('direction_id')->constrained('directions')->onDelete('cascade');
            $table->timestamps(); // Optional
        });
    }

    public function down()
    {
        Schema::dropIfExists('agents');
    }
}
