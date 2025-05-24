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

// TODO: Temporarily comment out all routes in this file to debug EmployeeManagement API and missing LocalizationController
// Route::prefix('localization')->name('localization.')->middleware(['web', 'auth'])->group(function () {
//     // Main localization routes
//     Route::get('/', 'LocalizationController@index')->name('index');
//
//     // Translations management
//     Route::get('/translations', 'LocalizationController@translations')->name('translations');
//     Route::post('/translations', 'LocalizationController@updateTranslations')->name('translations.update');
//     Route::get('/translations/{locale}/{group}', 'LocalizationController@translationGroup')->name('translations.group');
//     Route::post('/translations/{locale}/{group}', 'LocalizationController@updateTranslationGroup')->name('translations.group.update');
//     Route::post('/translations/import', 'LocalizationController@importTranslations')->name('translations.import');
//     Route::get('/translations/export/{locale?}', 'LocalizationController@exportTranslations')->name('translations.export');
//
//     // Locale management
//     Route::get('/locales', 'LocalizationController@locales')->name('locales');
//     Route::post('/locales', 'LocalizationController@storeLocale')->name('locales.store');
//     Route::delete('/locales/{locale}', 'LocalizationController@destroyLocale')->name('locales.destroy');
//     Route::get('/switch-locale/{locale}', 'LocalizationController@switchLocale')->name('switch-locale');
//
//     // Language management for user interface
//     Route::get('/languages', 'LocalizationController@languages')->name('languages');
//     Route::post('/languages', 'LocalizationController@storeLanguage')->name('languages.store');
//     Route::put('/languages/{language}', 'LocalizationController@updateLanguage')->name('languages.update');
//     Route::delete('/languages/{language}', 'LocalizationController@destroyLanguage')->name('languages.destroy');
// });



