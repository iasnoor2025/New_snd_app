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
    Route::apiResource('employees', 'Modules\EmployeeManagement\Http\Controllers\Api\EmployeeController');

    // Leave routes
    Route::apiResource('leaves', 'Modules\LeaveManagement\Http\Controllers\LeaveController', [
        'names' => [
            'index' => 'api.leaves.index',
            'store' => 'api.leaves.store',
            'show' => 'api.leaves.show',
            'update' => 'api.leaves.update',
            'destroy' => 'api.leaves.destroy',
        ]
    ]);

    // Timesheet routes
    // TODO: Uncomment when TimesheetController exists
    // Route::apiResource('timesheets', 'Modules\TimesheetManagement\Http\Controllers\API\TimesheetController');

    // Payroll routes
    // TODO: Uncomment when PayrollController exists
    // Route::apiResource('payrolls', 'Modules\Payroll\Http\Controllers\API\PayrollController');
    // TODO: Uncomment when AdvanceController exists
    // Route::apiResource('advances', 'Modules\Payroll\Http\Controllers\API\AdvanceController');
    // TODO: Uncomment when SettlementController exists
    // Route::apiResource('settlements', 'Modules\Payroll\Http\Controllers\API\SettlementController');

    // Project routes
    // TODO: Uncomment when ProjectController exists
    // Route::apiResource('projects', 'Modules\Project\Http\Controllers\API\ProjectController');

    // Rental routes
    // TODO: Uncomment when RentalController exists
    // Route::apiResource('rentals', 'Modules\Rental\Http\Controllers\API\RentalController');

    // Equipment routes
    // TODO: Uncomment when EquipmentController exists
    // Route::apiResource('equipment', 'Modules\EquipmentManagement\Http\Controllers\API\EquipmentController');

    // Settings routes
    // TODO: Uncomment when SettingController exists
    // Route::apiResource('settings', 'Modules\Settings\Http\Controllers\API\SettingController');

    // Notification routes
    // TODO: Uncomment when NotificationController exists
    // Route::apiResource('notifications', 'Modules\Notifications\Http\Controllers\API\NotificationController');

    // Report routes
    // TODO: Uncomment when ReportController exists
    // Route::apiResource('reports', 'Modules\Reporting\Http\Controllers\API\ReportController');
});



