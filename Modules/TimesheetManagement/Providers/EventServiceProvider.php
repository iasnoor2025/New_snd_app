<?php

namespace Modules\TimesheetManagement\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The module name.
     *
     * @var string
     */
    protected $moduleName = 'TimesheetManagement';

    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Modules\TimesheetManagement\Events\TimesheetSubmitted' => [
            'Modules\TimesheetManagement\Listeners\NotifyManager',
            'Modules\TimesheetManagement\Listeners\CalculateWorkHours',
        ],
        'Modules\TimesheetManagement\Events\TimesheetApproved' => [
            'Modules\TimesheetManagement\Listeners\NotifyEmployee',
            'Modules\TimesheetManagement\Listeners\UpdateWorkSummary',
        ],
        'Modules\TimesheetManagement\Events\TimesheetRejected' => [
            'Modules\TimesheetManagement\Listeners\NotifyEmployeeRejection'
        ],
        'Modules\TimesheetManagement\Events\OvertimeRecorded' => [
            'Modules\TimesheetManagement\Listeners\NotifyPayrollDepartment'
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}




