<?php

namespace App\Console\Commands;

use App\Models\Person;
use App\Mail\PopularProfileNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class CheckPopularProfiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'profiles:check-popular {--threshold=50}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for profiles with 50+ likes and send email notifications to admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $threshold = $this->option('threshold');
        $adminEmail = config('mail.admin_email', 'admin@example.com');

        $this->info("Checking for popular profiles (threshold: {$threshold} likes)...");

        // Find people with 50+ likes who haven't been notified
        $popularProfiles = Person::select('people.*')
            ->selectRaw('COUNT(likes.id) as likes_count')
            ->join('likes', 'people.id', '=', 'likes.liked_id')
            ->where('people.popular_profile_email_sent', false)
            ->groupBy('people.id', 'people.name', 'people.age', 'people.location',
                     'people.popular_profile_email_sent', 'people.popular_profile_email_sent_at',
                     'people.created_at', 'people.updated_at')
            ->havingRaw('COUNT(likes.id) >= ?', [$threshold])
            ->get();

        if ($popularProfiles->isEmpty()) {
            $this->info('No new popular profiles found.');
            return 0;
        }

        $this->info("Found {$popularProfiles->count()} popular profile(s)!");

        foreach ($popularProfiles as $person) {
            $likesCount = $person->likes_count;

            $this->info("Sending notification for {$person->name} ({$likesCount} likes)...");

            try {
                // Send email to admin
                Mail::to($adminEmail)->send(
                    new PopularProfileNotification($person, $likesCount)
                );

                // Mark as notified
                $person->update([
                    'popular_profile_email_sent' => true,
                    'popular_profile_email_sent_at' => now(),
                ]);

                $this->info("✓ Email sent for {$person->name}");
            } catch (\Exception $e) {
                $this->error("✗ Failed to send email for {$person->name}: {$e->getMessage()}");
            }
        }

        $this->info("Process completed!");
        return 0;
    }
}
