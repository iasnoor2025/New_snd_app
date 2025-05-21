<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;
use Modules\TimesheetManagement\Http\Controllers\TimesheetController;
use Modules\TimesheetManagement\Http\Controllers\TimesheetDashboardController;
use Modules\TimesheetManagement\Http\Controllers\WeeklyTimesheetController;
use Modules\TimesheetManagement\Http\Controllers\TimeEntryController;
use Modules\TimesheetManagement\Http\Controllers\OvertimeController;
use Modules\TimesheetManagement\Http\Controllers\TimesheetApprovalController;
use Modules\TimesheetManagement\Http\Controllers\TimesheetReportController;
use Modules\TimesheetManagement\Http\Controllers\TimesheetProjectController;
use Modules\TimesheetManagement\Http\Controllers\TimesheetSettingController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/', [TimesheetController::class, 'index'])->name('timesheets.index');
    Route::get('/dashboard', [TimesheetDashboardController::class, 'index'])->name('timesheets.dashboard');

    // Timesheets CRUD
    Route::get('/create', [TimesheetController::class, 'create'])->name('timesheets.create');
    Route::post('/', [TimesheetController::class, 'store'])->name('timesheets.store');
    Route::get('/{timesheet}', [TimesheetController::class, 'show'])->name('timesheets.show');
    Route::get('/{timesheet}/edit', [TimesheetController::class, 'edit'])->name('timesheets.edit');
    Route::put('/{timesheet}', [TimesheetController::class, 'update'])->name('timesheets.update');
    Route::delete('/{timesheet}', [TimesheetController::class, 'destroy'])->name('timesheets.destroy');
    Route::post('/{timesheet}/submit', [TimesheetController::class, 'submit'])->name('timesheets.submit');
    Route::get('/check-duplicate', [TimesheetController::class, 'checkDuplicate'])->name('timesheets.check-duplicate');
    Route::get('/monthly', [TimesheetController::class, 'monthly'])->name('timesheets.monthly');
    Route::get('/summary', [TimesheetController::class, 'summary'])->name('timesheets.summary');

    // Weekly timesheet
    Route::get('/weekly', [WeeklyTimesheetController::class, 'index'])->name('timesheets.weekly.index');
    Route::get('/weekly/create', [WeeklyTimesheetController::class, 'create'])->name('timesheets.weekly.create');
    Route::post('/weekly', [WeeklyTimesheetController::class, 'store'])->name('timesheets.weekly.store');
    Route::get('/weekly/{weekId}', [WeeklyTimesheetController::class, 'show'])->name('timesheets.weekly.show');
    Route::get('/weekly/{weekId}/edit', [WeeklyTimesheetController::class, 'edit'])->name('timesheets.weekly.edit');
    Route::put('/weekly/{weekId}', [WeeklyTimesheetController::class, 'update'])->name('timesheets.weekly.update');
    Route::post('/weekly/{weekId}/submit', [WeeklyTimesheetController::class, 'submit'])->name('timesheets.weekly.submit');

    // Daily timesheet entries
    Route::get('/entries', [TimeEntryController::class, 'index'])->name('timesheets.entries.index');
    Route::get('/entries/create', [TimeEntryController::class, 'create'])->name('timesheets.entries.create');
    Route::post('/entries', [TimeEntryController::class, 'store'])->name('timesheets.entries.store');
    Route::get('/entries/{entryId}', [TimeEntryController::class, 'show'])->name('timesheets.entries.show');
    Route::get('/entries/{entryId}/edit', [TimeEntryController::class, 'edit'])->name('timesheets.entries.edit');
    Route::put('/entries/{entryId}', [TimeEntryController::class, 'update'])->name('timesheets.entries.update');
    Route::delete('/entries/{entryId}', [TimeEntryController::class, 'destroy'])->name('timesheets.entries.destroy');

    // Overtime entries
    Route::get('/overtime', [OvertimeController::class, 'index'])->name('timesheets.overtime.index');
    Route::get('/overtime/create', [OvertimeController::class, 'create'])->name('timesheets.overtime.create');
    Route::post('/overtime', [OvertimeController::class, 'store'])->name('timesheets.overtime.store');

    // Approval routes
    Route::get('/approvals', [TimesheetApprovalController::class, 'index'])->name('timesheets.approvals.index');
    Route::put('/approvals/{timesheetId}/approve', [TimesheetApprovalController::class, 'approve'])->name('timesheets.approvals.approve');
    Route::put('/approvals/{timesheetId}/reject', [TimesheetApprovalController::class, 'reject'])->name('timesheets.approvals.reject');

    // Reports
    Route::get('/reports', [TimesheetReportController::class, 'index'])->name('timesheets.reports.index');
    Route::post('/reports/generate', [TimesheetReportController::class, 'generate'])->name('timesheets.reports.generate');
    Route::get('/reports/export', [TimesheetReportController::class, 'export'])->name('timesheets.reports.export');
    Route::get('/reports/monthly', [TimesheetReportController::class, 'monthlyReport'])->name('timesheets.reports.monthly');
    Route::get('/reports/payslip/{employeeId}/{month}', [TimesheetReportController::class, 'generatePaySlip'])->name('timesheets.reports.payslip');

    // Projects for timesheet
    Route::get('/projects', [TimesheetProjectController::class, 'index'])->name('timesheets.projects.index');

    // Settings
    Route::get('/settings', [TimesheetSettingController::class, 'edit'])->name('timesheets.settings.edit')->middleware('can:manage-timesheet-settings');
    Route::put('/settings', [TimesheetSettingController::class, 'update'])->name('timesheets.settings.update')->middleware('can:manage-timesheet-settings');

    // Additional routes with permission middleware
    Route::middleware(['permission:timesheets.view'])->group(function () {
        Route::get('/monthly-report', [TimesheetController::class, 'monthlyReport'])->name('timesheets.monthly-report');
        Route::get('/pay-slip/{employee}/{month}', [TimesheetController::class, 'generatePaySlip'])->name('timesheets.pay-slip');
        Route::get('/html-pay-slip/{employee}/{month}', [TimesheetController::class, 'generateHtmlPaySlip'])->name('timesheets.html-pay-slip');
        Route::get('/pay-slip-test/{employee?}/{month?}', function($employee = null, $month = null) {
            return Inertia::render('Timesheets/PaySlipTest', [
                'employeeId' => $employee,
                'month' => $month,
            ]);
        })->name('timesheets.pay-slip-test');

        // Alternative direct pay slip route that bypasses some middleware
        Route::get('/direct-pay-slip/{employee}/{month}', function($employee, $month) {
            // Get the employee
            $employee = \Modules\EmployeeManagement\Domain\Models\Employee::select([
                'id', 'first_name', 'last_name', 'employee_id', 'position'
            ])->findOrFail($employee);

            // Parse the month
            list($year, $monthNum) = explode('-', $month);
            $startDate = "{$year}-{$monthNum}-01";
            $endDate = date('Y-m-t', strtotime($startDate));
            $monthName = date('F', strtotime($startDate));

            // Get timesheets
            $timesheets = \Modules\TimesheetManagement\Domain\Models\Timesheet::where('employee_id', $employee->id)
                ->whereBetween('date', [$startDate, $endDate])
                ->orderBy('date')
                ->get();

            // Calculate totals
            $totalRegularHours = $timesheets->sum('hours_worked');
            $totalOvertimeHours = $timesheets->sum('overtime_hours');
            $totalHours = $totalRegularHours + $totalOvertimeHours;
            $daysWorked = $timesheets->count();

            // Create calendar data
            $calendar = [];
            foreach ($timesheets as $timesheet) {
                $date = $timesheet->date;
                $dayOfWeek = date('w', strtotime($date));
                $dayName = date('D', strtotime($date));

                $calendar[(string)$date] = [
                    'date' => $date,
                    'day_of_week' => (string)$dayOfWeek,
                    'day_name' => $dayName,
                    'regular_hours' => $timesheet->hours_worked,
                    'overtime_hours' => $timesheet->overtime_hours,
                ];
            }

            // Fill in missing days
            $currentDate = new \DateTime($startDate);
            $lastDate = new \DateTime($endDate);

            while ($currentDate <= $lastDate) {
                $dateString = $currentDate->format('Y-m-d');
                if (!isset($calendar[$dateString])) {
                    $calendar[$dateString] = [
                        'date' => $dateString,
                        'day_of_week' => (string)$currentDate->format('w'),
                        'day_name' => $currentDate->format('D'),
                        'regular_hours' => 0,
                        'overtime_hours' => 0,
                    ];
                }
                $currentDate->modify('+1 day');
            }

            return Inertia::render('Timesheets/PaySlip', [
                'employee' => $employee,
                'month' => $monthName,
                'year' => $year,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'total_regular_hours' => $totalRegularHours,
                'total_overtime_hours' => $totalOvertimeHours,
                'total_hours' => $totalHours,
                'days_worked' => $daysWorked,
                'calendar' => $calendar,
            ]);
        })->name('timesheets.direct-pay-slip');
    });
});




