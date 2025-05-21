<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    // Leave Requests API
    Route::get('/requests', 'Api\LeaveRequestController@index');
    Route::post('/requests', 'Api\LeaveRequestController@store');
    Route::get('/requests/{id}', 'Api\LeaveRequestController@show');
    Route::put('/requests/{id}', 'Api\LeaveRequestController@update');
    Route::delete('/requests/{id}', 'Api\LeaveRequestController@destroy');

    // Leave Approval API
    Route::put('/requests/{id}/approve', 'Api\LeaveApprovalController@approve');
    Route::put('/requests/{id}/reject', 'Api\LeaveApprovalController@reject');

    // Leave Balances API
    Route::get('/balances', 'Api\LeaveBalanceController@index');
    Route::get('/balances/{employeeId}', 'Api\LeaveBalanceController@show');

    // Leave Types API
    Route::get('/types', 'Api\LeaveTypeController@index');

    // Leave Calendar API
    Route::get('/calendar', 'Api\LeaveCalendarController@index');
    Route::get('/calendar/{year}/{month}', 'Api\LeaveCalendarController@month');
});

