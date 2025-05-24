<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group.
|
*/

use Illuminate\Support\Facades\Route;

// TODO: Temporarily comment out all routes in this file to debug EmployeeManagement API and missing MobileBridgeController

Route::middleware(['web', 'auth', 'verified'])->prefix('mobile-bridge')->name('mobile-bridge.')->group(function () {
    // Dashboard and overview
    // Route::get('/', 'MobileBridgeController@index')->name('index');

    // API key management
    // Route::get('/api-keys', 'MobileBridgeController@apiKeys')->name('api-keys');
    // Route::post('/api-keys', 'MobileBridgeController@storeApiKey')->name('api-keys.store');
    // Route::put('/api-keys/{id}', 'MobileBridgeController@updateApiKey')->name('api-keys.update');
    // Route::delete('/api-keys/{id}', 'MobileBridgeController@destroyApiKey')->name('api-keys.destroy');

    // Synchronization management
    // Route::get('/sync-status', 'MobileBridgeController@syncStatus')->name('sync-status');
    // Route::post('/sync/trigger', 'MobileBridgeController@triggerSync')->name('sync.trigger');
    // Route::get('/sync/history', 'MobileBridgeController@syncHistory')->name('sync.history');
    // Route::get('/sync/log/{id}', 'MobileBridgeController@syncLog')->name('sync.log');

    // Mobile app configuration
    // Route::get('/config', 'MobileBridgeController@configuration')->name('config');
    // Route::post('/config', 'MobileBridgeController@updateConfiguration')->name('config.update');

    // User device management
    // Route::get('/devices', 'MobileBridgeController@devices')->name('devices');
    // Route::delete('/devices/{id}', 'MobileBridgeController@removeDevice')->name('devices.remove');

    // Feedback and support
    // Route::get('/feedback', 'MobileBridgeController@feedbackList')->name('feedback');
    // Route::get('/feedback/{id}', 'MobileBridgeController@viewFeedback')->name('feedback.view');
    // Route::post('/feedback/{id}/respond', 'MobileBridgeController@respondToFeedback')->name('feedback.respond');
});



