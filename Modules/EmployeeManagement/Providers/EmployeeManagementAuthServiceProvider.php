<?php

namespace Modules\EmployeeManagement\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Modules\EmployeeManagement\Domain\Models\EmployeeAdvance;
use Modules\EmployeeManagement\Domain\Models\EmployeeDocument;
use Modules\EmployeeManagement\Policies\EmployeeAdvancePolicy;
use Modules\EmployeeManagement\Policies\EmployeeDocumentPolicy;

class EmployeeManagementAuthServiceProvider extends ServiceProvider
{
    /**
     * The module name.
     *
     * @var string
     */
    protected $moduleName = 'EmployeeManagement';

    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        EmployeeDocument::class => EmployeeDocumentPolicy::class,
        EmployeeAdvance::class => EmployeeAdvancePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}



