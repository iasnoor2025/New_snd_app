<?php

namespace Modules\EmployeeManagement\Actions;

use Modules\EmployeeManagement\Domain\Models\Employee;

class ShowEmployeeAction
{
    /**
     * Execute the action to show employee details.
     *
     * @param Employee $employee
     * @param string|null $month
     * @return array
     */
    public function execute(Employee $employee, $month = null): array
    {
        // You can expand this to include more related data as needed
        $data = $employee->toArray();
        if ($month) {
            $data['monthly_timesheet'] = $employee->getMonthlyTimesheetData($month, now()->year);
        }
        return $data;
    }
}
