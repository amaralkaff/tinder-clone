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
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('liker_id')->constrained('people')->onDelete('cascade');
            $table->foreignId('liked_id')->constrained('people')->onDelete('cascade');
            $table->timestamp('created_at')->nullable();

            // Indexes and constraints
            $table->unique(['liker_id', 'liked_id'], 'unique_like');
            $table->index('liked_id');
            $table->index(['liker_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
