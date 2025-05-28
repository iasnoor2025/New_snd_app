<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::post('users/{user}/roles', [UserController::class, 'assignRole'])->name('users.assignRole');
});

Route::get('/modules_statuses.json', function () {
    $path = base_path('modules_statuses.json');
    if (!file_exists($path)) {
        abort(404, 'modules_statuses.json not found');
    }
    return response()->file($path, [
        'Content-Type' => 'application/json'
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/modules.php';
require base_path('Modules/Payroll/Routes/web.php');
