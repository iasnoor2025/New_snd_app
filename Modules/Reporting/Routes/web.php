<?php

use Modules\Reporting\Http\Controllers\ReportController;
use Modules\Reporting\Http\Controllers\ReportBuilderController;
use Illuminate\Support\Facades\Route;

// Reports Routes
Route::middleware(['web', 'auth', 'verified', 'permission:reports.view'])->prefix('reports')->name('reports.')->group(function () {
    Route::get('/', [ReportController::class, 'index'])->name('index');
    Route::get('/clients', [ReportController::class, 'clients'])->name('clients');
    Route::get('/rentals', [ReportController::class, 'rentals'])->name('rentals');
    Route::get('/invoices', [ReportController::class, 'invoices'])->name('invoices');
    Route::get('/payments', [ReportController::class, 'payments'])->name('payments');
    Route::get('/equipment', [ReportController::class, 'equipment'])->name('equipment');
    Route::get('/revenue', [ReportController::class, 'revenue'])->name('revenue');

    // Show individual report
    Route::get('/{report}', [ReportBuilderController::class, 'show'])->name('show');

    // Report Builder
    Route::middleware(['permission:reports.build'])->group(function () {
        Route::get('/builder', [ReportBuilderController::class, 'index'])->name('builder');
        Route::post('/builder/generate', [ReportBuilderController::class, 'generate'])->name('builder.generate');
        Route::post('/builder/template', [ReportBuilderController::class, 'saveTemplate'])->name('builder.template');
        Route::post('/builder/schedule', [ReportBuilderController::class, 'scheduleReport'])->name('builder.schedule');
        Route::post('/builder/export', [ReportBuilderController::class, 'export'])->name('builder.export');

        // Report Templates
        Route::get('/templates', [ReportBuilderController::class, 'templates'])->name('templates');
        Route::delete('/templates/{template}', [ReportBuilderController::class, 'destroyTemplate'])->name('templates.destroy');

        // Scheduled Reports
        Route::get('/scheduled', [ReportBuilderController::class, 'scheduledReports'])->name('scheduled');
        Route::delete('/{report}', [ReportBuilderController::class, 'destroyReport'])->name('destroy');
    });
});



