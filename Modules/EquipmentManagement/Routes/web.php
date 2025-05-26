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

Route::middleware(['auth'])->group(function () {
    // Equipment index
    Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');
    // Equipment routes
    Route::get('/equipment/availability', [EquipmentController::class, 'availability'])->name('equipment.availability');
    Route::get('/equipment/create', [EquipmentController::class, 'create'])->name('equipment.create');
    Route::post('/equipment', [EquipmentController::class, 'store'])->name('equipment.store');
    Route::get('/equipment/{equipment}/edit', [EquipmentController::class, 'edit'])->name('equipment.edit');
    Route::put('/equipment/{equipment}', [EquipmentController::class, 'update'])->name('equipment.update');
    Route::post('/equipment/{equipment}/change-status', [EquipmentController::class, 'changeStatus'])->name('equipment.change-status');
    Route::delete('/equipment/{equipment}', [EquipmentController::class, 'destroy'])->name('equipment.destroy');
    // Maintenance routes
    Route::get('/equipment/maintenance/create', [MaintenanceRecordController::class, 'create'])->name('maintenance.create');
    Route::post('/equipment/maintenance', [MaintenanceRecordController::class, 'store'])->name('maintenance.store');
    Route::get('/equipment/{equipment}/maintenance/create', [MaintenanceRecordController::class, 'createForEquipment'])->name('equipment.maintenance.create');
    Route::get('/equipment/maintenance/inventory-items', [MaintenancePartController::class, 'inventoryItems'])->name('maintenance.inventory-items');
    Route::get('/equipment/maintenance', [MaintenanceRecordController::class, 'index'])->name('maintenance.index');
    Route::get('/equipment/maintenance-schedule', [MaintenanceRecordController::class, 'schedule'])->name('maintenance.schedule');
    Route::get('/equipment/maintenance/{maintenance}', [MaintenanceRecordController::class, 'show'])->name('maintenance.show');
});

