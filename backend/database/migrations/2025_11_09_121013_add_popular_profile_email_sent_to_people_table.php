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
        Schema::table('people', function (Blueprint $table) {
            $table->boolean('popular_profile_email_sent')->default(false)->after('location');
            $table->timestamp('popular_profile_email_sent_at')->nullable()->after('popular_profile_email_sent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('people', function (Blueprint $table) {
            $table->dropColumn(['popular_profile_email_sent', 'popular_profile_email_sent_at']);
        });
    }
};
