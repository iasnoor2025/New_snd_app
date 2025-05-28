<?php

namespace Modules\EmployeeManagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\EmployeeManagement\Domain\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Department::updateOrCreate([
            'name' => 'General',
        ], [
            'description' => 'General department',
            'status' => 'active',
        ]);
        Department::updateOrCreate([
            'name' => 'Operations',
        ], [
            'description' => 'Operations department',
            'status' => 'active',
        ]);
    }
}
