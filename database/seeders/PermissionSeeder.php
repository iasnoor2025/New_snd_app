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
        $permissionNames = $permissionNames->unique()->filter();

        foreach ($permissionNames as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}
