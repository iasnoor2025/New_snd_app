<?php

use Illuminate\Support\Facades\Route;
use Modules\EquipmentManagement\Http\Controllers\Api\EquipmentApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\EquipmentMaintenanceApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\EquipmentCostApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\EquipmentUtilizationApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\EquipmentTrackingApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\MaintenanceApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\MaintenanceScheduleApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\MaintenanceTaskApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\MaintenanceRecordApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\TechnicianApiController;
use Modules\EquipmentManagement\Http\Controllers\Api\DepreciationApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Equipment management
    Route::apiResource('equipment', EquipmentApiController::class);
    Route::get('equipment/{equipment}/history', [EquipmentApiController::class, 'history']);
    Route::get('equipment/{equipment}/documents', [EquipmentApiController::class, 'documents']);
    Route::post('equipment/{equipment}/documents', [EquipmentApiController::class, 'storeDocument']);
    Route::put('equipment/{equipment}/status', [EquipmentApiController::class, 'updateStatus']);

    // Equipment costs and depreciation
    Route::get('equipment/{equipment}/costs', [EquipmentCostApiController::class, 'index']);
    Route::post('equipment/{equipment}/costs', [EquipmentCostApiController::class, 'store']);
    Route::get('equipment/{equipment}/depreciation', [DepreciationApiController::class, 'show']);
    Route::get('depreciation/dashboard', [DepreciationApiController::class, 'dashboard']);

    // Equipment utilization and tracking
    Route::get('equipment/{equipment}/utilization', [EquipmentUtilizationApiController::class, 'show']);
    Route::get('equipment/utilization/report', [EquipmentUtilizationApiController::class, 'report']);
    Route::get('equipment/{equipment}/tracking', [EquipmentTrackingApiController::class, 'show']);
    Route::post('equipment/{equipment}/tracking', [EquipmentTrackingApiController::class, 'update']);

    // Maintenance management
    Route::apiResource('maintenance', MaintenanceApiController::class);
    Route::apiResource('maintenance-schedules', MaintenanceScheduleApiController::class);
    Route::apiResource('maintenance-tasks', MaintenanceTaskApiController::class);
    Route::apiResource('maintenance-records', MaintenanceRecordApiController::class);
    Route::post('equipment/{equipment}/maintenance', [EquipmentMaintenanceApiController::class, 'schedule']);
    Route::get('equipment/{equipment}/maintenance', [EquipmentMaintenanceApiController::class, 'history']);
    Route::put('maintenance/{maintenance}/complete', [MaintenanceApiController::class, 'markComplete']);

    // Technicians
    Route::apiResource('technicians', TechnicianApiController::class);
    Route::get('technicians/{technician}/workload', [TechnicianApiController::class, 'workload']);
    Route::post('maintenance/{maintenance}/assign', [MaintenanceApiController::class, 'assignTechnician']);
});

