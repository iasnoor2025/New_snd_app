<?php

use Illuminate\Support\Facades\Route;
use Modules\API\Http\Controllers\APIController;
use Modules\API\Http\Controllers\ApiTokenController;
use Modules\API\Http\Controllers\ApiDocsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the APIServiceProvider within a group which
| contains the "web" middleware group.
|
*/

Route::middleware(['web', 'auth', 'verified'])->prefix('api')->name('api.')->group(function () {
    // API Dashboard
    Route::get('/', [APIController::class, 'index'])->name('dashboard');

    // Documentation
    Route::get('/documentation', [ApiDocsController::class, 'index'])->name('documentation');
    Route::get('/documentation/{version}', [ApiDocsController::class, 'showVersion'])->name('documentation.version');
    Route::get('/documentation/{version}/{endpoint}', [ApiDocsController::class, 'showEndpoint'])->name('documentation.endpoint');

    // API Token Management
    Route::get('/tokens', [ApiTokenController::class, 'index'])->name('tokens.index');
    Route::get('/tokens/create', [ApiTokenController::class, 'create'])->name('tokens.create');
    Route::post('/tokens', [ApiTokenController::class, 'store'])->name('tokens.store');
    Route::get('/tokens/{token}', [ApiTokenController::class, 'show'])->name('tokens.show');
    Route::put('/tokens/{token}', [ApiTokenController::class, 'update'])->name('tokens.update');
    Route::delete('/tokens/{token}', [ApiTokenController::class, 'destroy'])->name('tokens.destroy');

    // API Usage Statistics
    Route::get('/stats', [APIController::class, 'stats'])->name('stats');
    Route::get('/stats/usage', [APIController::class, 'usageStats'])->name('stats.usage');
    Route::get('/stats/endpoints', [APIController::class, 'endpointStats'])->name('stats.endpoints');
    Route::get('/stats/export', [APIController::class, 'exportStats'])->name('stats.export');

    // API Configuration
    Route::middleware(['can:manage api settings'])->group(function() {
        Route::get('/settings', [APIController::class, 'settings'])->name('settings');
        Route::post('/settings', [APIController::class, 'updateSettings'])->name('settings.update');
        Route::get('/rate-limits', [APIController::class, 'rateLimits'])->name('rate-limits');
        Route::post('/rate-limits', [APIController::class, 'updateRateLimits'])->name('rate-limits.update');
    });
});



