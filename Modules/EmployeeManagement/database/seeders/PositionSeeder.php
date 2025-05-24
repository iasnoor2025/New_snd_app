<?php

namespace Modules\EmployeeManagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\EmployeeManagement\Domain\Models\Position;

class PositionSeeder extends Seeder
{
    public function run()
    {
        $positions = [
            ['name' => 'Manager', 'description' => 'Manages the team', 'is_active' => true],
            ['name' => 'Engineer', 'description' => 'Handles engineering tasks', 'is_active' => true],
            ['name' => 'Technician', 'description' => 'Technical support', 'is_active' => true],
            ['name' => 'HR', 'description' => 'Human Resources', 'is_active' => true],
            ['name' => 'Accountant', 'description' => 'Handles accounts', 'is_active' => true],
        ];

        foreach ($positions as $position) {
            Position::updateOrCreate(['name' => $position['name']], $position);
        }
    }
}
