<?php

use Illuminate\Support\Facades\Route;
use Modules\EmployeeManagement\Http\Controllers\Api\EmployeeController;
use Modules\EmployeeManagement\Http\Controllers\Api\TimesheetController;
use Modules\EmployeeManagement\Http\Controllers\DepartmentController;
use Modules\EmployeeManagement\Http\Controllers\PositionController;
use Modules\EmployeeManagement\Http\Controllers\EmployeeDocumentController;
use Modules\EmployeeManagement\Http\Controllers\EmployeeAdvanceController;
use Modules\EmployeeManagement\Http\Controllers\ResignationController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Employee core routes
    Route::apiResource('employees', EmployeeController::class);
    Route::get('employees/{employee}/documents', [EmployeeController::class, 'documents']);
    Route::get('employees/{employee}/timesheets', [EmployeeController::class, 'timesheets']);
    Route::get('employees/{employee}/advances', [EmployeeController::class, 'advances']);

    // Timesheet routes
    Route::apiResource('timesheets', TimesheetController::class);
    Route::post('timesheets/{timesheet}/approve', [TimesheetController::class, 'approve']);
    Route::post('timesheets/{timesheet}/reject', [TimesheetController::class, 'reject']);

    // Department routes
    Route::apiResource('departments', DepartmentController::class)->only(['index', 'show']);

    // Position routes
    Route::apiResource('positions', PositionController::class)->only(['index', 'show']);

    // Document management
    Route::apiResource('employee-documents', EmployeeDocumentController::class);
    Route::post('employee-documents/{document}/download', [EmployeeDocumentController::class, 'download']);

    // Employee advances
    Route::apiResource('employee-advances', EmployeeAdvanceController::class);

    // Resignations
    Route::apiResource('resignations', ResignationController::class);
    Route::post('resignations/{resignation}/approve', [ResignationController::class, 'approve']);
    Route::post('resignations/{resignation}/reject', [ResignationController::class, 'reject']);
});

