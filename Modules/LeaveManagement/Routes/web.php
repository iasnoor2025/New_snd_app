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
use Modules\LeaveManagement\Http\Controllers\LeaveController;
use Modules\LeaveManagement\Http\Controllers\LeaveRequestController;
use Modules\LeaveManagement\Http\Controllers\LeaveApprovalController;
use Modules\LeaveManagement\Http\Controllers\LeaveBalanceController;
use Modules\LeaveManagement\Http\Controllers\LeaveTypeController;
use Modules\LeaveManagement\Http\Controllers\LeaveReportController;
use Modules\LeaveManagement\Http\Controllers\LeaveSettingController;

Route::prefix('hr/leaves')->name('leaves.')->middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/', [LeaveController::class, 'index'])->name('index');

    // Leave Requests (CRUD)
    Route::resource('requests', LeaveRequestController::class);

    // Leave Approval
    Route::get('/approvals', [LeaveApprovalController::class, 'index'])->name('approvals.index');
    Route::put('/approvals/{leaveRequest}/approve', [LeaveApprovalController::class, 'approve'])->name('approvals.approve');
    Route::put('/approvals/{leaveRequest}/reject', [LeaveApprovalController::class, 'reject'])->name('approvals.reject');

    // Leave Balances
    Route::get('/balances', [LeaveBalanceController::class, 'index'])->name('balances.index');
    Route::get('/balances/{employee}', [LeaveBalanceController::class, 'show'])->name('balances.show');

    // Leave Types Management
    Route::resource('types', LeaveTypeController::class)->middleware('can:manage-leave-types');

    // Leave Reports
    Route::get('/reports', [LeaveReportController::class, 'index'])->name('reports.index');
    Route::post('/reports/generate', [LeaveReportController::class, 'generate'])->name('reports.generate');
    Route::get('/reports/export', [LeaveReportController::class, 'export'])->name('reports.export');

    // Leave Settings
    Route::get('/settings', [LeaveSettingController::class, 'edit'])->name('settings.edit')->middleware('can:manage-leave-settings');
    Route::put('/settings', [LeaveSettingController::class, 'update'])->name('settings.update')->middleware('can:manage-leave-settings');

    // Routes for leave requests
    Route::middleware(['permission:leave-requests.create'])->group(function () {
        Route::get('leave-requests/create', [LeaveRequestController::class, 'create'])->name('leave-requests.create');
        Route::post('leave-requests', [LeaveRequestController::class, 'store'])->name('leave-requests.store');
    });
});

