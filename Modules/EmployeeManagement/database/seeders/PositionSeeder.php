<?php

namespace Modules\EmployeeManagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\EmployeeManagement\Domain\Models\Position;
use Modules\EmployeeManagement\Domain\Models\Department;

class PositionSeeder extends Seeder
{
    public function run()
    {
        // For translatable fields stored as JSON, we need to search within the JSON
        $department = Department::where('name', 'like', '%General%')->first();

        if (!$department) {
            throw new \Exception('Department "General" not found.');
        }
        $positions = [
            ['name' => 'Manager', 'description' => 'Manages the team', 'is_active' => true, 'department_id' => $department->id],
            ['name' => 'Engineer', 'description' => 'Handles engineering tasks', 'is_active' => true, 'department_id' => $department->id],
            ['name' => 'Technician', 'description' => 'Technical support', 'is_active' => true, 'department_id' => $department->id],
            ['name' => 'HR', 'description' => 'Human Resources', 'is_active' => true, 'department_id' => $department->id],
            ['name' => 'Accountant', 'description' => 'Handles accounts', 'is_active' => true, 'department_id' => $department->id],
        ];

        foreach ($positions as $position) {
            Position::updateOrCreate(['name' => $position['name']], $position);
        }
    }
}
