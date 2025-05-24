<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\MobileBridge\Http\Controllers\Api\MobileSyncApiController;
use Modules\MobileBridge\Http\Controllers\Api\MobileConfigApiController;
use Modules\MobileBridge\Http\Controllers\Api\MobileAuthApiController;
use Modules\MobileBridge\Http\Controllers\Api\MobileFeedbackApiController;
use Modules\MobileBridge\Http\Controllers\Api\MobileSupportApiController;
use Modules\MobileBridge\Http\Controllers\Api\MobileNotificationApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// TODO: Temporarily comment out all routes in this file to debug EmployeeManagement API

Route::middleware(['auth:sanctum'])->prefix('v1/mobile')->group(function () {
    // Data synchronization
    // Route::get('sync', [MobileSyncApiController::class, 'getData']);
    // Route::post('sync', [MobileSyncApiController::class, 'syncData']);
    // Route::get('sync/status', [MobileSyncApiController::class, 'getSyncStatus']);
    // Route::post('sync/offline-data', [MobileSyncApiController::class, 'processOfflineData']);

    // Mobile app configuration
    // Route::get('config', [MobileConfigApiController::class, 'getConfig']);
    // Route::post('config/update', [MobileConfigApiController::class, 'updateConfig']);
    // Route::get('config/version', [MobileConfigApiController::class, 'getAppVersion']);

    // User management
    // Route::get('user', [MobileAuthApiController::class, 'getUser']);
    // Route::post('user/profile', [MobileAuthApiController::class, 'updateProfile']);
    // Route::post('user/settings', [MobileAuthApiController::class, 'updateSettings']);

    // Feedback and support
    // Route::post('feedback', [MobileFeedbackApiController::class, 'storeFeedback']);
    // Route::get('support/faqs', [MobileSupportApiController::class, 'getFaqs']);
    // Route::post('support/ticket', [MobileSupportApiController::class, 'createSupportTicket']);

    // Notifications
    // Route::get('notifications', [MobileNotificationApiController::class, 'getNotifications']);
    // Route::post('notifications/register-device', [MobileNotificationApiController::class, 'registerDevice']);
    // Route::post('notifications/read', [MobileNotificationApiController::class, 'markAsRead']);
});

