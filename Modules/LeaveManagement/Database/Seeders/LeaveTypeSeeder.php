<?php

namespace Modules\LeaveManagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\LeaveManagement\Domain\Models\LeaveType;

class LeaveTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            [
                'name' => 'Annual Leave',
                'description' => 'Paid annual leave',
                'days_allowed' => 30,
                'requires_approval' => true,
                'requires_attachment' => false,
                'is_paid' => true,
                'is_active' => true,
                'color_code' => '#4caf50',
                'applies_to_gender' => null,
            ],
            [
                'name' => 'Sick Leave',
                'description' => 'Paid sick leave',
                'days_allowed' => 10,
                'requires_approval' => true,
                'requires_attachment' => true,
                'is_paid' => true,
                'is_active' => true,
                'color_code' => '#f44336',
                'applies_to_gender' => null,
            ],
            [
                'name' => 'Maternity Leave',
                'description' => 'Paid maternity leave',
                'days_allowed' => 90,
                'requires_approval' => true,
                'requires_attachment' => true,
                'is_paid' => true,
                'is_active' => true,
                'color_code' => '#e91e63',
                'applies_to_gender' => 'female',
            ],
        ];
        foreach ($types as $data) {
            LeaveType::updateOrCreate([
                'name' => $data['name'],
            ], $data);
        }
    }
}
