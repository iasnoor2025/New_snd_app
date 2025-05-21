<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create basic permissions
        $permissions = [
            // User management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            // Role management
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            // Module permissions
            'dashboard.view',
            'settings.view',
            'settings.edit',
        ];

        $createdPermissions = collect();
        foreach ($permissions as $permission) {
            $createdPermissions->push(Permission::firstOrCreate(['name' => $permission]));
        }

        // Create admin role if it doesn't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions($createdPermissions);

        // Create admin user if it doesn't exist
        $admin = User::firstOrCreate(
            ['email' => 'admin@ias.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Assign admin role to the user
        $admin->assignRole('admin');
    }
}
