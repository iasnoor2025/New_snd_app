<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run the CoreTableSeeder to create and populate core module tables
        $this->call(CoreTableSeeder::class);

        // Run the Core module migrations manually
        $this->call(CoreModuleMigrator::class);

        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'role_id' => 1, // Assuming 1 is the ID for the admin role
            'status' => 1, // Assuming 1 is the ID for the active status
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
