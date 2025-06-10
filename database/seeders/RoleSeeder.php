<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $employee = Role::firstOrCreate(['name' => 'employee']);
        $customer = Role::firstOrCreate(['name' => 'customer']);
        $technician = Role::firstOrCreate(['name' => 'technician']);
        $accountant = Role::firstOrCreate(['name' => 'accountant']);
        $hr = Role::firstOrCreate(['name' => 'hr']);
        $supervisor = Role::firstOrCreate(['name' => 'supervisor']);

        // Admin gets all permissions
        $admin->syncPermissions(Permission::all());

        // Manager permissions
        $managerPermissions = [
            'dashboard.view',
            'users.view', 'users.create', 'users.edit',
            'employees.view', 'employees.create', 'employees.edit',
            'customers.view', 'customers.create', 'customers.edit',
            'rentals.view', 'rentals.create', 'rentals.edit', 'rentals.approve',
            'reports.view', 'reports.build',
            'timesheets.view', 'timesheets.edit',
            'leave-requests.view', 'leave-requests.approve',
            'payroll.view',
        ];
        $manager->syncPermissions($managerPermissions);

        // Employee permissions
        $employeePermissions = [
            'dashboard.view',
            'timesheets.view', 'timesheets.create', 'timesheets.edit',
            'leave-requests.view', 'leave-requests.create',
            'rentals.view',
        ];
        $employee->syncPermissions($employeePermissions);

        // Customer permissions
        $customerPermissions = [
            'dashboard.view',
            'rentals.view',
            'quotations.view',
            'invoices.view',
        ];
        $customer->syncPermissions($customerPermissions);

        // Technician permissions
        $technicianPermissions = [
            'dashboard.view',
            'maintenance.view', 'maintenance.create', 'maintenance.edit',
            'timesheets.view', 'timesheets.create', 'timesheets.edit',
            'rentals.view',
        ];
        $technician->syncPermissions($technicianPermissions);

        // Accountant permissions
        $accountantPermissions = [
            'dashboard.view',
            'payments.view', 'payments.create', 'payments.edit',
            'invoices.view', 'invoices.create', 'invoices.edit',
            'quotations.view', 'quotations.create', 'quotations.edit',
            'payroll.view', 'payroll.create', 'payroll.edit',
            'reports.view', 'reports.build',
        ];
        $accountant->syncPermissions($accountantPermissions);

        // HR permissions
        $hrPermissions = [
            'dashboard.view',
            'employees.view', 'employees.create', 'employees.edit',
            'leave-requests.view', 'leave-requests.approve',
            'leave-types.view', 'leave-types.create', 'leave-types.edit',
            'payroll.view',
            'timesheets.view',
        ];
        $hr->syncPermissions($hrPermissions);

        // Supervisor permissions
        $supervisorPermissions = [
            'dashboard.view',
            'employees.view',
            'timesheets.view', 'timesheets.edit',
            'leave-requests.view', 'leave-requests.approve',
            'rentals.view', 'rentals.edit',
            'tasks.view', 'tasks.create', 'tasks.edit',
        ];
        $supervisor->syncPermissions($supervisorPermissions);
    }
}
