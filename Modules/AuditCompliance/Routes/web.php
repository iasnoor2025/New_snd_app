<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group.
|
*/

use Illuminate\Support\Facades\Route;
use Modules\AuditCompliance\Http\Controllers\AuditLogController;

Route::middleware(['web', 'auth', 'verified'])->prefix('audit')->name('audit.')->group(function () {
    // Main dashboards
    Route::get('/', [AuditLogController::class, 'index'])->name('index');
    Route::get('/dashboard', [AuditLogController::class, 'dashboard'])->name('dashboard');

    // Audit logs
    Route::get('/logs', [AuditLogController::class, 'index'])->name('logs');
    Route::get('/logs/{auditLog}', [AuditLogController::class, 'show'])->name('logs.show');
    Route::get('/logs/filter', [AuditLogController::class, 'filter'])->name('logs.filter');
    Route::get('/logs/user/{user}', [AuditLogController::class, 'userActivity'])->name('logs.user');
    Route::get('/logs/model/{model}/{id}', [AuditLogController::class, 'modelChanges'])->name('logs.model');

    // Reports
    Route::get('/reports', [AuditLogController::class, 'reports'])->name('reports');
    Route::get('/reports/activity', [AuditLogController::class, 'activityReport'])->name('reports.activity');
    Route::get('/reports/changes', [AuditLogController::class, 'changesReport'])->name('reports.changes');
    Route::get('/reports/user-activity', [AuditLogController::class, 'userActivityReport'])->name('reports.user-activity');
    Route::get('/reports/export', [AuditLogController::class, 'export'])->name('reports.export');
    Route::post('/reports/generate', [AuditLogController::class, 'generateReport'])->name('reports.generate');

    // Compliance monitoring
    Route::middleware(['can:manage compliance'])->group(function() {
        Route::get('/compliance', [AuditLogController::class, 'compliance'])->name('compliance');
        Route::get('/compliance/settings', [AuditLogController::class, 'complianceSettings'])->name('compliance.settings');
        Route::post('/compliance/settings', [AuditLogController::class, 'updateComplianceSettings'])->name('compliance.settings.update');
        Route::get('/compliance/alerts', [AuditLogController::class, 'complianceAlerts'])->name('compliance.alerts');
    });
});

