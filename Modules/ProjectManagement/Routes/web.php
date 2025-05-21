<?php

use Illuminate\Support\Facades\Route;
use Modules\ProjectManagement\Http\Controllers\ProjectController;
use Modules\ProjectManagement\Http\Controllers\ProjectResourceController;
use Modules\ProjectManagement\Http\Controllers\ManpowerController;
use Modules\ProjectManagement\Http\Controllers\EquipmentController;
use Modules\ProjectManagement\Http\Controllers\MaterialController;
use Modules\ProjectManagement\Http\Controllers\FuelController;
use Modules\ProjectManagement\Http\Controllers\ExpenseController;
use Modules\ProjectManagement\Http\Controllers\TaskController;
use Inertia\Inertia;

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

Route::middleware(['web', 'auth'])->group(function() {
    // Project routes
    Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/{project}', [ProjectController::class, 'show'])->name('projects.show')->where('project', '[0-9]+');
    Route::get('/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit')->where('project', '[0-9]+');
    Route::put('/{project}', [ProjectController::class, 'update'])->name('projects.update')->where('project', '[0-9]+');
    Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy')->where('project', '[0-9]+');

    // Project Progress Demo Route
    Route::get('/progress/demo', function() {
        return Inertia::render('ProjectProgressDemo');
    })->name('projects.progress.demo');

    // Project resources routes
    Route::get('/{project}/resources', [ProjectResourceController::class, 'index'])
        ->name('projects.resources');

    // Generic resource destroy route to handle delete requests from the main Resources component
    Route::delete('/{project}/resources/{resource}', [ProjectResourceController::class, 'destroy'])
        ->name('projects.resources.destroy');

    // Project tasks routes
    Route::get('/{project}/tasks', [TaskController::class, 'index'])
        ->name('projects.tasks.index');
    Route::post('/{project}/tasks', [TaskController::class, 'store'])
        ->name('projects.tasks.store');
    Route::put('/{project}/tasks/{task}', [TaskController::class, 'update'])
        ->name('projects.tasks.update')
        ->where('task', '[0-9]+');
    Route::put('/{project}/tasks/{task}/status', [TaskController::class, 'updateStatus'])
        ->name('projects.tasks.status')
        ->where('task', '[0-9]+');
    Route::delete('/{project}/tasks/{task}', [TaskController::class, 'destroy'])
        ->name('projects.tasks.destroy')
        ->where('task', '[0-9]+');

    // Project resource routes grouped by type
    Route::prefix('{project}/resources')->name('projects.resources.')->group(function () {
        // Manpower routes
        Route::get('/manpower', [ManpowerController::class, 'index'])
            ->name('manpower.index');
        Route::post('/manpower', [ProjectResourceController::class, 'storeManpower'])
            ->name('manpower.store');
        Route::put('/manpower/{manpower}', [ProjectResourceController::class, 'updateManpower'])
            ->name('manpower.update');
        Route::delete('/manpower/{manpower}', [ProjectResourceController::class, 'destroyManpower'])
            ->name('manpower.destroy');

        // Equipment routes
        Route::get('/equipment', [EquipmentController::class, 'index'])
            ->name('equipment.index');
        Route::post('/equipment', [ProjectResourceController::class, 'storeEquipment'])
            ->name('equipment.store');
        Route::put('/equipment/{equipment}', [ProjectResourceController::class, 'updateEquipment'])
            ->name('equipment.update');
        Route::delete('/equipment/{equipment}', [ProjectResourceController::class, 'destroyEquipment'])
            ->name('equipment.destroy');

        // Material routes
        Route::get('/material', [MaterialController::class, 'index'])
            ->name('material.index');
        Route::post('/material', [ProjectResourceController::class, 'storeMaterial'])
            ->name('material.store');
        Route::put('/material/{material}', [ProjectResourceController::class, 'updateMaterial'])
            ->name('material.update');
        Route::delete('/material/{material}', [ProjectResourceController::class, 'destroyMaterial'])
            ->name('material.destroy');

        // Fuel routes
        Route::get('/fuel', [FuelController::class, 'index'])
            ->name('fuel.index');
        Route::post('/fuel', [ProjectResourceController::class, 'storeFuel'])
            ->name('fuel.store');
        Route::put('/fuel/{fuel}', [ProjectResourceController::class, 'updateFuel'])
            ->name('fuel.update');
        Route::delete('/fuel/{fuel}', [ProjectResourceController::class, 'destroyFuel'])
            ->name('fuel.destroy');

        // Expense routes
        Route::get('/expense', [ExpenseController::class, 'index'])
            ->name('expense.index');
        Route::post('/expense', [ProjectResourceController::class, 'storeExpense'])
            ->name('expense.store');
        Route::put('/expense/{expense}', [ProjectResourceController::class, 'updateExpense'])
            ->name('expense.update');
        Route::delete('/expense/{expense}', [ProjectResourceController::class, 'destroyExpense'])
            ->name('expense.destroy');

        // Generic resource delete route with type parameter
        Route::delete('/{type}/{resource}', [ProjectResourceController::class, 'destroyResource'])
            ->name('resource.destroy');
    });
});

