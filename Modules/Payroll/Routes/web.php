<?php

use Illuminate\Support\Facades\Route;
use Modules\Payroll\Http\Controllers\PayrollController;
use Modules\Payroll\Http\Controllers\SalaryAdvanceController;
use Modules\Payroll\Http\Controllers\FinalSettlementController;
use Modules\Payroll\Http\Controllers\AdvancePaymentController;

/*
|--------------------------------------------------------------------------
| Payroll Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your payroll module.
|
*/

Route::prefix('hr/payroll')->name('payroll.')->middleware(['auth', 'verified'])->group(function () {
    // Payroll listing and management
    Route::get('/', [PayrollController::class, 'index'])->name('index');
    Route::get('/create', [PayrollController::class, 'create'])->name('create');
    Route::post('/', [PayrollController::class, 'store'])->name('store');
    Route::get('/{payroll}', [PayrollController::class, 'show'])->name('show');
    Route::post('/{payroll}/approve', [PayrollController::class, 'approve'])->name('approve');
    Route::post('/{payroll}/process-payment', [PayrollController::class, 'processPayment'])->name('process-payment');
    Route::post('/{payroll}/cancel', [PayrollController::class, 'cancel'])->name('cancel');
    Route::post('/generate-monthly', [PayrollController::class, 'generateMonthlyPayroll'])->name('generate-monthly');
    Route::prefix('runs')->name('runs.')->group(function () {
        Route::get('/{payrollRun}', [PayrollController::class, 'showPayrollRun'])->name('show');
        Route::post('/{payrollRun}/approve', [PayrollController::class, 'approvePayrollRun'])->name('approve');
        Route::post('/{payrollRun}/reject', [PayrollController::class, 'rejectPayrollRun'])->name('reject');
    });
    // Salary Advance routes
    Route::resource('salary-advances', SalaryAdvanceController::class);
    Route::post('salary-advances/{salaryAdvance}/approve', [SalaryAdvanceController::class, 'approve'])->name('salary-advances.approve');
    Route::post('salary-advances/{salaryAdvance}/reject', [SalaryAdvanceController::class, 'reject'])->name('salary-advances.reject');
    // Final Settlement routes
    Route::prefix('final-settlements')->name('final-settlements.')->group(function () {
        Route::get('/', [FinalSettlementController::class, 'index'])->name('index');
        Route::get('/create', [FinalSettlementController::class, 'create'])->name('create');
        Route::post('/', [FinalSettlementController::class, 'store'])->name('store');
        Route::get('/{finalSettlement}', [FinalSettlementController::class, 'show'])->name('show');
        Route::post('/{finalSettlement}/approve', [FinalSettlementController::class, 'approve'])->name('approve');
        Route::post('/{finalSettlement}/mark-as-paid', [FinalSettlementController::class, 'processPayment'])->name('mark-as-paid');
        Route::post('/{finalSettlement}/cancel', [FinalSettlementController::class, 'cancel'])->name('cancel');
        Route::get('/{finalSettlement}/report', [FinalSettlementController::class, 'generateReport'])->name('report');
    });
    // Advance Payment Routes
    Route::prefix('employees/{employee}/advances')->group(function () {
        Route::get('/', [AdvancePaymentController::class, 'index'])
            ->name('employees.advances.index');
        Route::post('/', [AdvancePaymentController::class, 'store'])
            ->middleware(['permission:advances.create'])
            ->name('employees.advances.store');
        Route::get('/create', [AdvancePaymentController::class, 'create'])
            ->middleware(['permission:advances.create'])
            ->name('employees.advances.create');
        Route::get('/history', [AdvancePaymentController::class, 'paymentHistory'])
            ->name('employees.advances.payment-history');
        Route::get('/history/api', [AdvancePaymentController::class, 'apiPaymentHistory'])
            ->name('employees.advances.payment-history.api');
        Route::delete('/history/{payment}', [AdvancePaymentController::class, 'deletePaymentHistory'])
            ->middleware(['permission:advances.delete'])
            ->name('employees.advances.payment-history.delete');
        Route::patch('/monthly-deduction', [AdvancePaymentController::class, 'updateMonthlyDeduction'])
            ->middleware(['permission:advances.edit'])
            ->name('employees.advances.monthly-deduction');
        Route::get('/{advance}', [AdvancePaymentController::class, 'show'])
            ->name('employees.advances.show');
        Route::get('/{advance}/edit', [AdvancePaymentController::class, 'edit'])
            ->middleware(['permission:advances.edit'])
            ->name('employees.advances.edit');
        Route::patch('/{advance}', [AdvancePaymentController::class, 'update'])
            ->middleware(['permission:advances.edit'])
            ->name('employees.advances.update');
        Route::delete('/{advance}', [AdvancePaymentController::class, 'destroy'])
            ->middleware(['permission:advances.delete'])
            ->name('employees.advances.destroy');
        Route::post('/{advance}/repayment', [AdvancePaymentController::class, 'recordRepayment'])
            ->middleware(['permission:advances.edit'])
            ->name('employees.advances.repayment');
        Route::post('/{advance}/approve', [AdvancePaymentController::class, 'approve'])
            ->middleware(['permission:advances.approve'])
            ->name('employees.advances.approve');
        Route::post('/{advance}/reject', [AdvancePaymentController::class, 'reject'])
            ->middleware(['permission:advances.approve'])
            ->name('employees.advances.reject');
        Route::get('/payment/{payment}/receipt', [AdvancePaymentController::class, 'receipt'])
            ->name('employees.advances.payment.receipt');
    });
    // All Advance Payments Route
    Route::get('/advance-payments', [AdvancePaymentController::class, 'allAdvances'])
        ->name('advance-payments.index');
});



