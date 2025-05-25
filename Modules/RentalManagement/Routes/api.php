<?php

use Illuminate\Support\Facades\Route;
use Modules\RentalManagement\Http\Controllers\RentalController;
use Modules\RentalManagement\Http\Controllers\RentalItemController;
use Modules\RentalManagement\Http\Controllers\RentalHistoryController;
use Modules\RentalManagement\Http\Controllers\RentalExtensionController;
use Modules\RentalManagement\Http\Controllers\QuotationController;
use Modules\RentalManagement\Http\Controllers\InvoiceController;
use Modules\RentalManagement\Http\Controllers\PaymentController;
use Modules\RentalManagement\Http\Controllers\CustomerController;
use Modules\RentalManagement\Http\Controllers\SupplierController;
use Modules\RentalManagement\Http\Controllers\RentalTimesheetController;
use Modules\RentalManagement\Http\Controllers\RentalAnalyticsController;

// API routes uncommented

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Rental routes
    Route::apiResource('rentals', RentalController::class);
    Route::get('rentals/{rental}/items', [RentalController::class, 'items']);
    Route::post('rentals/{rental}/extend', [RentalExtensionController::class, 'extend']);
    Route::post('rentals/{rental}/return', [RentalController::class, 'return']);

    // Rental items
    Route::apiResource('rental-items', RentalItemController::class);

    // Rental history
    Route::get('rental-history', [RentalHistoryController::class, 'index']);
    Route::get('rental-history/{id}', [RentalHistoryController::class, 'show']);

    // Quotations
    Route::apiResource('quotations', QuotationController::class);
    Route::post('quotations/{quotation}/convert', [QuotationController::class, 'convertToRental']);

    // Invoices and payments
    Route::apiResource('invoices', InvoiceController::class);
    Route::apiResource('payments', PaymentController::class);

    // Customers and suppliers
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('suppliers', SupplierController::class);

    // Rental timesheets
    Route::apiResource('rental-timesheets', RentalTimesheetController::class);

    // Analytics
    Route::get('analytics/rentals', [RentalAnalyticsController::class, 'rentalsAnalytics']);
    Route::get('analytics/revenue', [RentalAnalyticsController::class, 'revenueAnalytics']);
    Route::get('analytics/equipment-utilization', [RentalAnalyticsController::class, 'equipmentUtilization']);
});

