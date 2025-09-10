<?php

// Migration 1: create_directions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectionsTable extends Migration
{
    public function up()
    {
        Schema::create('directions', function (Blueprint $table) {
            $table->id(); // This creates unsignedBigInteger primary key
            $table->string('sigle')->unique();
            $table->string('designation');
            $table->string('type');
            $table->timestamps(); // Optional: add if you want created_at/updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('directions');
    }
}


