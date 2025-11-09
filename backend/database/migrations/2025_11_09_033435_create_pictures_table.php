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
        Schema::create('pictures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained('people')->onDelete('cascade');
            $table->string('image_url', 500);
            $table->tinyInteger('order')->unsigned()->default(0);
            $table->timestamps();

            // Indexes
            $table->index('person_id');
            $table->index(['person_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pictures');
    }
};
