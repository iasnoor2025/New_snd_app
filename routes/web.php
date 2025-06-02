<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Core\Http\Controllers\UserController;
use Modules\Core\Http\Controllers\RoleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Use lowercase role names for Spatie permission middleware (case-sensitive)
Route::middleware(['auth', 'role:admin'])->group(function () {
    // User and role management routes are handled by Core module
// See Modules/Core/Routes/web.php for detailed routes
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

Route::get('/whoami', function () {
    return [
        'user' => auth()->user(),
        'permissions' => auth()->user()?->getAllPermissions()->pluck('name'),
    ];
});

Route::redirect('/roles', '/settings/roles');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/modules.php';
require __DIR__.'/avatar.php';
require __DIR__.'/employee-avatar.php';
require __DIR__.'/customer-avatar.php';
require __DIR__.'/profile.php';
require base_path('Modules/Payroll/Routes/web.php');
