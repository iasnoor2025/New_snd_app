<?php

use Illuminate\Support\Facades\Route;
use Modules\Payroll\Http\Controllers\PayrollController;
use Modules\Payroll\Http\Controllers\SalaryAdvanceController;
use Modules\Payroll\Http\Controllers\FinalSettlementController;
use Modules\Payroll\Http\Controllers\AdvancePaymentController;

/*
|--------------------------------------------------------------------------
| Payroll API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your payroll module.
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Payroll Routes
    Route::prefix('api/payroll')->name('api.payroll.')->group(function () {
        // Payroll listing and management
        Route::get('/', [PayrollController::class, 'index'])->name('index');
        Route::post('/', [PayrollController::class, 'store'])->name('store');
        Route::get('/{payroll}', [PayrollController::class, 'show'])->name('show');

        // Payroll actions
        Route::post('/{payroll}/approve', [PayrollController::class, 'approve'])->name('approve');
        Route::post('/{payroll}/process-payment', [PayrollController::class, 'processPayment'])->name('process-payment');
        Route::post('/{payroll}/cancel', [PayrollController::class, 'cancel'])->name('cancel');

        // Bulk payroll operations
        Route::post('/generate-monthly', [PayrollController::class, 'generateMonthlyPayroll'])->name('generate-monthly');

        // Payroll runs
        Route::prefix('runs')->name('runs.')->group(function () {
            Route::get('/{payrollRun}', [PayrollController::class, 'showPayrollRun'])->name('show');
            Route::post('/{payrollRun}/approve', [PayrollController::class, 'approvePayrollRun'])->name('approve');
            Route::post('/{payrollRun}/reject', [PayrollController::class, 'rejectPayrollRun'])->name('reject');
        });
    });

    // Salary Advance API Routes
    Route::prefix('api/salary-advances')->name('api.salary-advances.')->group(function() {
        Route::get('/', [SalaryAdvanceController::class, 'index'])->name('index');
        Route::post('/', [SalaryAdvanceController::class, 'store'])->name('store');
        Route::get('/{salaryAdvance}', [SalaryAdvanceController::class, 'show'])->name('show');
        Route::post('/{salaryAdvance}/approve', [SalaryAdvanceController::class, 'approve'])->name('approve');
        Route::post('/{salaryAdvance}/reject', [SalaryAdvanceController::class, 'reject'])->name('reject');
    });

    // Final Settlement API Routes
    Route::prefix('api/final-settlements')->name('api.final-settlements.')->group(function() {
        Route::get('/', [FinalSettlementController::class, 'index'])->name('index');
        Route::post('/', [FinalSettlementController::class, 'store'])->name('store');
        Route::get('/{finalSettlement}', [FinalSettlementController::class, 'show'])->name('show');
        Route::post('/{finalSettlement}/approve', [FinalSettlementController::class, 'approve'])->name('approve');
        Route::post('/{finalSettlement}/process-payment', [FinalSettlementController::class, 'processPayment'])->name('process-payment');
        Route::post('/{finalSettlement}/cancel', [FinalSettlementController::class, 'cancel'])->name('cancel');
        Route::get('/{finalSettlement}/report', [FinalSettlementController::class, 'generateReport'])->name('report');
    });

    // Advance Payment API Routes
    Route::get('/employees/{employee}/advance-payments/history', [AdvancePaymentController::class, 'apiPaymentHistory'])
        ->name('api.employees.advance-payments.history');

    Route::get('/employees/{employee}/advance-payments', [AdvancePaymentController::class, 'getEmployeeAdvances'])
        ->name('api.employees.advance-payments');
});



