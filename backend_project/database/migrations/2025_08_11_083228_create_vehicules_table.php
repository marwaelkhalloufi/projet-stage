<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiculesTable extends Migration
{
    public function up()
    {
        Schema::create('vehicules', function (Blueprint $table) {
            $table->id();
            $table->string('immatriculation')->unique();
            $table->string('marque');
            $table->string('modele');
            $table->integer('annee');
            $table->string('type_carburant');
            $table->decimal('consommation_moyenne', 5, 2)->nullable();
            $table->timestamps(); // Optional
        });
    }

    public function down()
    {
        Schema::dropIfExists('vehicules');
    }
}
