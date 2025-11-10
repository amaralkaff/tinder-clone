<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule popular profile check to run daily at 9 AM
// Threshold: 20 likes (recommended for small apps < 1000 users)
Schedule::command('profiles:check-popular --threshold=20')
    ->daily()
    ->at('09:00')
    ->timezone('Asia/Jakarta')
    ->withoutOverlapping()
    ->onOneServer()
    ->appendOutputTo(storage_path('logs/popular-profiles.log'));
