<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Thought;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThoughtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::count() < 3 ? collect([
            User::create([
                'name' => 'Meera Joshi',
                'email' => 'meera@example.com',
                'password' => bcrypt('password'),
            ]),
            User::create([
                'name' => 'Rohan Mehta',
                'email' => 'rohan@example.com',
                'password' => bcrypt('password'),
            ]),
            User::create([
                'name' => 'Ananya Sharma',
                'email' => 'aanya@example.com',
                'password' => bcrypt('password'),
            ]),
        ])
        : User::take(3)->get();

        $thoughts = [
            'Just discovered Laravel - where has this been all my life? 🚀',
            'Building something cool with Chirper today!',
            'Laravel\'s Eloquent ORM is pure magic ✨',
            'Deployed my first app with Laravel Cloud. So smooth!',
            'Who else is loving Blade components?',
            'Friday deploys with Laravel? No problem! 😎',
        ];

        // Create chirps for random users
        foreach ($thoughts as $message) {
            $users->random()->thoughts()->create([
                'message' => $message,
                'type' => 'post',
                'created_at' => now()->subMinutes(rand(5, 1440)),
            ]);
        }
    }
}
