<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the APIServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {
    // Employee routes
    Route::apiResource('employees', 'Modules\Employee\Http\Controllers\API\EmployeeController');

    // Leave routes
    Route::apiResource('leaves', 'Modules\LeaveManagement\Http\Controllers\API\LeaveController');

    // Timesheet routes
    Route::apiResource('timesheets', 'Modules\TimesheetManagement\Http\Controllers\API\TimesheetController');

    // Payroll routes
    Route::apiResource('payrolls', 'Modules\Payroll\Http\Controllers\API\PayrollController');
    Route::apiResource('advances', 'Modules\Payroll\Http\Controllers\API\AdvanceController');
    Route::apiResource('settlements', 'Modules\Payroll\Http\Controllers\API\SettlementController');

    // Project routes
    Route::apiResource('projects', 'Modules\Project\Http\Controllers\API\ProjectController');

    // Rental routes
    Route::apiResource('rentals', 'Modules\Rental\Http\Controllers\API\RentalController');

    // Equipment routes
    Route::apiResource('equipment', 'Modules\EquipmentManagement\Http\Controllers\API\EquipmentController');

    // Settings routes
    Route::apiResource('settings', 'Modules\Settings\Http\Controllers\API\SettingController');

    // Notification routes
    Route::apiResource('notifications', 'Modules\Notifications\Http\Controllers\API\NotificationController');

    // Report routes
    Route::apiResource('reports', 'Modules\Reporting\Http\Controllers\API\ReportController');
});



