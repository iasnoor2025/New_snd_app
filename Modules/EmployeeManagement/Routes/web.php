<?php

use Illuminate\Support\Facades\Route;
use Modules\EmployeeManagement\Http\Controllers\EmployeeManagementController;
use Modules\EmployeeManagement\Http\Controllers\EmployeeController;
use Modules\EmployeeManagement\Http\Controllers\ResignationController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('employeemanagements', EmployeeManagementController::class)
        ->middleware([
            'permission:employeemanagement.view',
        ])
        ->names('employeemanagement');

    // Employees index
    Route::get('/employees', [EmployeeController::class, 'index'])
        ->middleware('permission:employees.view')
        ->name('employees.index');

    // Employees routes
    Route::get('/employees/create', [EmployeeController::class, 'create'])
        ->middleware('permission:employees.create')
        ->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])
        ->middleware('permission:employees.create')
        ->name('employees.store');
    Route::get('/employees/{employee}', [EmployeeController::class, 'show'])
        ->middleware('permission:employees.view')
        ->name('employees.show');
    Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])
        ->middleware('permission:employees.edit')
        ->name('employees.edit');
    Route::put('/employees/{employee}', [EmployeeController::class, 'update'])
        ->middleware('permission:employees.edit')
        ->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])
        ->middleware('permission:employees.delete')
        ->name('employees.destroy');

    // Employee document management
    Route::get('/employees/{employee}/documents', function ($employee) {
        return Inertia::render('Employees/Documents', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.documents');

    // Employee timesheet history
    Route::get('/employees/{employee}/timesheet-history', function ($employee) {
        return Inertia::render('Employees/TimesheetHistory', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.timesheet-history');

    // Employee performance reviews
    Route::get('/employees/{employee}/performance-reviews', function ($employee) {
        return Inertia::render('Employees/PerformanceReviews', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.performance-reviews');

    // Employee performance management
    Route::get('/employees/{employee}/performance-management', function ($employee) {
        return Inertia::render('Employees/PerformanceManagement', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.performance-management');

    // Employee salary history
    Route::get('/employees/{employee}/salary-history', function ($employee) {
        return Inertia::render('Employees/SalaryHistory', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.salary-history');

    // Employee leave history
    Route::get('/employees/{employee}/leave-history', function ($employee) {
        return Inertia::render('Employees/LeaveHistory', ['employeeId' => $employee]);
    })
        ->middleware('permission:employees.view')
        ->name('employees.leave-history');

    // Add resignations.create route for the frontend
    Route::get('/resignations/create', [ResignationController::class, 'create'])
        ->middleware('permission:resignations.create')
        ->name('resignations.create');
});

// Add access restriction update route
Route::post('/employees/{employee}/access-restrictions', [EmployeeController::class, 'updateAccessRestrictions'])
    ->name('employees.update-access-restrictions')
    ->middleware(['permission:employees.edit']);

