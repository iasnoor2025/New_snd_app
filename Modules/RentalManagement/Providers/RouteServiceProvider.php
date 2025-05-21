<?php

namespace Modules\RentalManagement\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected string $modulenamespace = 'Modules\RentalManagement\app\Http\Controllers';

    /**
     * Called before routes are registered.
     *
     * Register any model bindings or pattern based filters.
     */
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->namespace($this->moduleNamespace)
                ->group(module_path('Rental', 'routes/web.php'));

            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->moduleNamespace)
                ->group(module_path('Rental', 'routes/api.php'));
        });
    }

    /**
     * Define the routes for the application.
     */
    public function map(): void
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     */
    protected function mapWebRoutes(): void
    {
        Route::middleware('web')->group(module_path('Rental', '/routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     */
    protected function mapApiRoutes(): void
    {
        Route::middleware('api')->prefix('api')->name('api.')->group(module_path('Rental', '/routes/api.php'));
    }
}
