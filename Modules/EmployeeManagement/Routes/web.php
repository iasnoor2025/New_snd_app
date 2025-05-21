<?php

use Illuminate\Support\Facades\Route;
use Modules\EmployeeManagement\Http\Controllers\EmployeeManagementController;
use Modules\EmployeeManagement\Http\Controllers\EmployeeController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('employeemanagements', EmployeeManagementController::class)->names('employeemanagement');

    // Employees index
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');

    // Employees routes
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('/employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
    Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

    // Employee document management
    Route::get('/employees/{employee}/documents', function ($employee) {
        return Inertia::render('Employees/Documents', ['employeeId' => $employee]);
    })->name('employees.documents');

    // Employee timesheet history
    Route::get('/employees/{employee}/timesheet-history', function ($employee) {
        return Inertia::render('Employees/TimesheetHistory', ['employeeId' => $employee]);
    })->name('employees.timesheet-history');

    // Employee performance reviews
    Route::get('/employees/{employee}/performance-reviews', function ($employee) {
        return Inertia::render('Employees/PerformanceReviews', ['employeeId' => $employee]);
    })->name('employees.performance-reviews');

    // Employee performance management
    Route::get('/employees/{employee}/performance-management', function ($employee) {
        return Inertia::render('Employees/PerformanceManagement', ['employeeId' => $employee]);
    })->name('employees.performance-management');

    // Employee salary history
    Route::get('/employees/{employee}/salary-history', function ($employee) {
        return Inertia::render('Employees/SalaryHistory', ['employeeId' => $employee]);
    })->name('employees.salary-history');

    // Employee leave history
    Route::get('/employees/{employee}/leave-history', function ($employee) {
        return Inertia::render('Employees/LeaveHistory', ['employeeId' => $employee]);
    })->name('employees.leave-history');
});

// Add access restriction update route
Route::post('/employees/{employee}/access-restrictions', [EmployeeController::class, 'updateAccessRestrictions'])
    ->name('employees.update-access-restrictions')
    ->middleware(['permission:employees.edit']);

