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
use Modules\EquipmentManagement\Http\Controllers\EquipmentController;
use Modules\EquipmentManagement\Http\Controllers\MaintenanceController;
use Modules\EquipmentManagement\Http\Controllers\MaintenanceRecordController;
use Modules\EquipmentManagement\Http\Controllers\MaintenancePartController;
use Modules\EquipmentManagement\Http\Controllers\MaintenanceScheduleController;

Route::prefix('equipment')->name('equipment.')->middleware(['web', 'auth'])->group(function () {
    // Equipment routes
    Route::middleware(['permission:equipment.view'])->group(function () {
        Route::get('/', [EquipmentController::class, 'index'])->name('equipment.index');
        Route::get('equipment-availability', [EquipmentController::class, 'availability'])->name('equipment.availability');
    });

    Route::middleware(['permission:equipment.create'])->group(function () {
        Route::get('equipment/create', [EquipmentController::class, 'create'])->name('equipment.create');
        Route::post('equipment', [EquipmentController::class, 'store'])->name('equipment.store');
    });

    Route::middleware(['permission:equipment.edit'])->group(function () {
        Route::get('equipment/{equipment}/edit', [EquipmentController::class, 'edit'])->name('equipment.edit');
        Route::put('equipment/{equipment}', [EquipmentController::class, 'update'])->name('equipment.update');
        Route::post('equipment/{equipment}/change-status', [EquipmentController::class, 'changeStatus'])->name('equipment.change-status');
    });

    Route::middleware(['permission:equipment.delete'])->group(function () {
        Route::delete('equipment/{equipment}', [EquipmentController::class, 'destroy'])->name('equipment.destroy');
    });

    // Maintenance routes
    // IMPORTANT: Define explicit routes BEFORE the wildcard routes
    Route::middleware(['permission:maintenance.create'])->group(function () {
        Route::get('maintenance/create', [MaintenanceRecordController::class, 'create'])->name('maintenance.create');
        Route::post('maintenance', [MaintenanceRecordController::class, 'store'])->name('maintenance.store');
        Route::get('equipment/{equipment}/maintenance/create', [MaintenanceRecordController::class, 'createForEquipment'])->name('equipment.maintenance.create');
    });

    // Inventory items route
    Route::get('maintenance/inventory-items', [MaintenancePartController::class, 'inventoryItems'])->name('maintenance.inventory-items');

    // Then define view routes
    Route::middleware(['permission:maintenance.view'])->group(function () {
        Route::get('maintenance', [MaintenanceRecordController::class, 'index'])->name('maintenance.index');
        Route::get('maintenance-schedule', [MaintenanceRecordController::class, 'schedule'])->name('maintenance.schedule');
        Route::get('maintenance/{maintenance}', [MaintenanceRecordController::class, 'show'])->name('maintenance.show');
    });
});

