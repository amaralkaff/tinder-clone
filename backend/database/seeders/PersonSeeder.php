<?php

namespace Database\Seeders;

use App\Models\Person;
use App\Models\Picture;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Sample profile images from placeholder services
        $imageBaseUrls = [
            'https://i.pravatar.cc/400?img=',
            'https://randomuser.me/api/portraits/women/',
            'https://randomuser.me/api/portraits/men/',
        ];

        // Create 25 people
        for ($i = 1; $i <= 25; $i++) {
            $person = Person::create([
                'name' => $faker->name(),
                'age' => $faker->numberBetween(18, 45),
                'location' => $faker->city() . ', ' . $faker->country(),
            ]);

            // Create 3-5 pictures for each person
            $pictureCount = $faker->numberBetween(3, 5);
            for ($j = 0; $j < $pictureCount; $j++) {
                $imageService = $faker->randomElement([0, 1, 2]);

                $imageUrl = match($imageService) {
                    0 => 'https://i.pravatar.cc/400?img=' . $faker->numberBetween(1, 70),
                    1 => 'https://randomuser.me/api/portraits/women/' . $faker->numberBetween(1, 99) . '.jpg',
                    2 => 'https://randomuser.me/api/portraits/men/' . $faker->numberBetween(1, 99) . '.jpg',
                    default => 'https://i.pravatar.cc/400?img=' . $faker->numberBetween(1, 70),
                };

                Picture::create([
                    'person_id' => $person->id,
                    'image_url' => $imageUrl,
                    'order' => $j,
                ]);
            }
        }

        $this->command->info('Created 25 people with 3-5 pictures each');
    }
}
