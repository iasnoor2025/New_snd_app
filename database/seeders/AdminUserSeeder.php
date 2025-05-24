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
            // Employee management
            'employees.view',
            'employees.create',
            'employees.edit',
            'employees.delete',
            // Rental management
            'rentals.view',
            'rentals.create',
            'rentals.edit',
            'rentals.delete',
            'rentals.approve',
            // Timesheet management
            'timesheets.view',
            // Reports
            'reports.view',
            'reports.build',
            // Customer management
            'customers.view',
            'customers.create',
            'customers.edit',
            'customers.delete',

            // Document management
            'documents.view',
            'documents.create',
            'documents.edit',
            'documents.delete',
            // Test document management
            'test_documents.view',
            'test_documents.create',
            'test_documents.edit',
            'test_documents.delete',
            // Employee resignation management
            'employee_resignations.view',
            'employee_resignations.create',
            'employee_resignations.edit',
            'employee_resignations.delete',
            // Employee advance management
            'employee_advances.view',
            'employee_advances.create',
            'employee_advances.edit',
            'employee_advances.delete',
            // Employee document management
            'employee_documents.view',
            'employee_documents.create',
            'employee_documents.edit',
            'employee_documents.delete',
            // Employee timesheet management
            'employee_timesheets.view',
            'employee_timesheets.create',
            'employee_timesheets.edit',
            'employee_timesheets.delete',
            // Employee timesheet approval
            'employee_timesheets.approve',
            // Employee resignation approval
            'employee_resignations.approve',
            // Employee advance approval
            'employee_advances.approve',
            // Rental approval
            'rentals.approve',
            // Test document approval
            'test_documents.approve',
            // Customer document management
            'customer_documents.view',
            'customer_documents.create',
            'customer_documents.edit',
            'customer_documents.delete',
            // Customer document approval
            'customer_documents.approve',
            // Customer document approval

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
