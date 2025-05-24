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

// ADD routes at the top level, with explicit names
Route::get('/', [APIController::class, 'index'])->name('api.main-dashboard');
Route::get('/documentation', [ApiDocsController::class, 'index'])->name('api.documentation');
Route::get('/documentation/{version}', [ApiDocsController::class, 'showVersion'])->name('api.documentation.version');
Route::get('/documentation/{version}/{endpoint}', [ApiDocsController::class, 'showEndpoint'])->name('api.documentation.endpoint');

Route::get('/tokens', [ApiTokenController::class, 'index'])->name('api.tokens.index');
Route::get('/tokens/create', [ApiTokenController::class, 'create'])->name('api.tokens.create');
Route::post('/tokens', [ApiTokenController::class, 'store'])->name('api.tokens.store');
Route::get('/tokens/{token}', [ApiTokenController::class, 'show'])->name('api.tokens.show');
Route::put('/tokens/{token}', [ApiTokenController::class, 'update'])->name('api.tokens.update');
Route::delete('/tokens/{token}', [ApiTokenController::class, 'destroy'])->name('api.tokens.destroy');

Route::get('/stats', [APIController::class, 'stats'])->name('api.stats');
Route::get('/stats/usage', [APIController::class, 'usageStats'])->name('api.stats.usage');
Route::get('/stats/endpoints', [APIController::class, 'endpointStats'])->name('api.stats.endpoints');
Route::get('/stats/export', [APIController::class, 'exportStats'])->name('api.stats.export');

Route::middleware(['can:manage api settings'])->group(function() {
    Route::get('/settings', [APIController::class, 'settings'])->name('api.settings');
    Route::post('/settings', [APIController::class, 'updateSettings'])->name('api.settings.update');
    Route::get('/rate-limits', [APIController::class, 'rateLimits'])->name('api.rate-limits');
    Route::post('/rate-limits', [APIController::class, 'updateRateLimits'])->name('api.rate-limits.update');
});



