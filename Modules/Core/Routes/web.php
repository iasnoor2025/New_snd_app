<?php

use Illuminate\Support\Facades\Route;
use Modules\Core\Http\Controllers\UserController;
use Modules\Core\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| Core Module Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your module. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "web" middleware group.
|
*/

// User Management Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // User routes
    Route::middleware(['permission:users.view'])->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    });

    Route::middleware(['permission:users.create'])->group(function () {
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
    });

    Route::middleware(['permission:users.edit'])->group(function () {
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    });

    Route::middleware(['permission:users.delete'])->group(function () {
        Route::delete('users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    // Role routes
    Route::middleware(['permission:roles.view'])->group(function () {
        Route::get('settings/roles', [RoleController::class, 'index'])->name('roles.index');
        Route::get('settings/roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::get('settings/roles/{role}', [RoleController::class, 'show'])->name('roles.show');
        Route::get('settings/user-roles', [RoleController::class, 'userRoles'])->name('roles.user-roles');
    });

    Route::middleware(['permission:roles.create'])->group(function () {
        Route::get('settings/roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('settings/roles', [RoleController::class, 'store'])->name('roles.store');
    });

    Route::middleware(['permission:roles.edit'])->group(function () {
        Route::get('settings/roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
        Route::put('settings/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::put('settings/user-roles/{user}', [RoleController::class, 'updateUserRoles'])->name('roles.update-user-roles');
    });

    Route::middleware(['permission:roles.delete'])->group(function () {
        Route::delete('settings/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    });
});
