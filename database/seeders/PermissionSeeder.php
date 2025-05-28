<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\File;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissionNames = collect();
        $directories = [base_path('app'), base_path('Modules'), base_path('routes')];

        foreach ($directories as $dir) {
            if (!is_dir($dir)) continue;
            $files = File::allFiles($dir);
            foreach ($files as $file) {
                if ($file->getExtension() !== 'php') continue;
                $contents = File::get($file->getPathname());
                preg_match_all('/permission:([\w.-]+)/', $contents, $matches1);
                preg_match_all('/Permission::create\(\[\'name\' => \'([\w.-]+)\'/', $contents, $matches2);
                $permissionNames = $permissionNames->merge($matches1[1])->merge($matches2[1]);
            }
        }

        // Master list of all required permissions
        $masterPermissions = [
            // Project
            'project.view', 'project.create', 'project.edit', 'project.delete',
            // Equipment
            'equipment.view', 'equipment.create', 'equipment.edit', 'equipment.delete',
            // Add more as needed
            'users.view', 'users.create', 'users.edit', 'users.delete',
            'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
            'permissions.view', 'permissions.create', 'permissions.edit', 'permissions.delete',
            'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
            'reports.view', 'reports.build',
            'rentals.view', 'rentals.create', 'rentals.edit', 'rentals.delete', 'rentals.approve',
            'maintenance.view', 'maintenance.create', 'maintenance.edit', 'maintenance.delete',
            'technicians.view', 'technicians.create', 'technicians.edit', 'technicians.delete',
            'timesheets.view',

            // ...add all other permissions you want to guarantee
        ];

        $permissionNames = $permissionNames->merge($masterPermissions)->unique()->filter();

        foreach ($permissionNames as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}
