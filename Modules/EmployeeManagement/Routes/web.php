<?php

use Illuminate\Support\Facades\Route;
use Modules\EmployeeManagement\Http\Controllers\EmployeeManagementController;
use Modules\EmployeeManagement\Http\Controllers\EmployeeController;
use Modules\EmployeeManagement\Http\Controllers\ResignationController;
use Modules\EmployeeManagement\Http\Controllers\SalaryIncrementController;
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

    // Salary Increment routes
    Route::get('/salary-increments', [SalaryIncrementController::class, 'index'])
        ->middleware('permission:salary-increments.view')
        ->name('salary-increments.index');
    Route::get('/salary-increments/create', [SalaryIncrementController::class, 'create'])
        ->middleware('permission:salary-increments.create')
        ->name('salary-increments.create');
    Route::post('/salary-increments', [SalaryIncrementController::class, 'store'])
        ->middleware('permission:salary-increments.create')
        ->name('salary-increments.store');
    Route::get('/salary-increments/{salaryIncrement}', [SalaryIncrementController::class, 'show'])
        ->middleware('permission:salary-increments.view')
        ->name('salary-increments.show');
    Route::get('/salary-increments/{salaryIncrement}/edit', [SalaryIncrementController::class, 'edit'])
        ->middleware('permission:salary-increments.edit')
        ->name('salary-increments.edit');
    Route::put('/salary-increments/{salaryIncrement}', [SalaryIncrementController::class, 'update'])
        ->middleware('permission:salary-increments.edit')
        ->name('salary-increments.update');
    Route::delete('/salary-increments/{salaryIncrement}', [SalaryIncrementController::class, 'destroy'])
        ->middleware('permission:salary-increments.delete')
        ->name('salary-increments.destroy');
    Route::post('/salary-increments/{salaryIncrement}/approve', [SalaryIncrementController::class, 'approve'])
        ->middleware('permission:salary-increments.approve')
        ->name('salary-increments.approve');
    Route::post('/salary-increments/{salaryIncrement}/reject', [SalaryIncrementController::class, 'reject'])
        ->middleware('permission:salary-increments.approve')
        ->name('salary-increments.reject');
    Route::post('/salary-increments/{salaryIncrement}/apply', [SalaryIncrementController::class, 'apply'])
        ->middleware('permission:salary-increments.apply')
        ->name('salary-increments.apply');
});

// Add access restriction update route
Route::post('/employees/{employee}/access-restrictions', [EmployeeController::class, 'updateAccessRestrictions'])
    ->name('employees.update-access-restrictions')
    ->middleware(['permission:employees.edit']);

