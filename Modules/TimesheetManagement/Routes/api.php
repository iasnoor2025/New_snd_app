<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// API routes uncommented

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\TimesheetManagement\Http\Controllers\TimesheetController;

Route::middleware('auth:sanctum')->group(function () {
    // Weekly timesheets
    Route::get('/weekly-timesheets', 'Api\WeeklyTimesheetController@index');
    Route::get('/weekly-timesheets/current', 'Api\WeeklyTimesheetController@current');
    Route::get('/weekly-timesheets/{id}', 'Api\WeeklyTimesheetController@show');
    Route::post('/weekly-timesheets', 'Api\WeeklyTimesheetController@store');
    Route::put('/weekly-timesheets/{id}', 'Api\WeeklyTimesheetController@update');
    Route::post('/weekly-timesheets/{id}/submit', 'Api\WeeklyTimesheetController@submit');

    // Time entries
    Route::get('/time-entries', 'Api\TimeEntryController@index');
    Route::post('/time-entries', 'Api\TimeEntryController@store');
    Route::get('/time-entries/{id}', 'Api\TimeEntryController@show');
    Route::put('/time-entries/{id}', 'Api\TimeEntryController@update');
    Route::delete('/time-entries/{id}', 'Api\TimeEntryController@destroy');
    Route::post('/time-entries/bulk', 'Api\TimeEntryController@bulkStore');

    // Overtime entries
    Route::get('/overtime-entries', 'Api\OvertimeController@index');
    Route::post('/overtime-entries', 'Api\OvertimeController@store');

    // Approvals
    Route::get('/approvals', 'Api\TimesheetApprovalController@index');
    Route::put('/approvals/{id}/approve', 'Api\TimesheetApprovalController@approve');
    Route::put('/approvals/{id}/reject', 'Api\TimesheetApprovalController@reject');

    // Reports
    Route::get('/reports/summary', 'Api\TimesheetReportController@summary');
    Route::post('/reports/generate', 'Api\TimesheetReportController@generate');

    // Calendar integration
    Route::get('/calendar', 'Api\TimesheetCalendarController@index');
    Route::get('/calendar/{year}/{month}', 'Api\TimesheetCalendarController@month');

    // Projects for timesheet
    Route::get('/projects', 'Api\TimesheetProjectController@index');

    // Tasks for timesheet
    Route::get('/tasks', 'Api\TimesheetTaskController@index');
    Route::get('/projects/{projectId}/tasks', 'Api\TimesheetTaskController@tasksForProject');

    Route::prefix('employees/{employee}')->group(function () {
        Route::get('timesheets', [TimesheetController::class, 'apiEmployeeTimesheets']);
        Route::get('timesheets/total-hours', [TimesheetController::class, 'apiEmployeeTimesheetTotalHours']);
    });
});

