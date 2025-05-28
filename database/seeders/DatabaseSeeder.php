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

        // Run the PermissionSeeder first
        $this->call(PermissionSeeder::class);

        // Run the AdminUserSeeder to create admin role and user
        $this->call(AdminUserSeeder::class);

        // Run the RoleSeeder to create roles
        $this->call(RoleSeeder::class);

        // Create a test user if needed
        if (app()->environment('local', 'development')) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
