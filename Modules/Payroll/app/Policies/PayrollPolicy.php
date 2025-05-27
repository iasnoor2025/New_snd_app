<?php

namespace Modules\Payroll\app\Policies;

class PayrollPolicy
{
    // Add your policy methods here as needed
    public function viewAny($user)
    {
        return $user->hasPermissionTo('payrolls.view');
    }

    public function view($user, $model = null)
    {
        return $user->hasPermissionTo('payrolls.view');
    }

    public function create($user)
    {
        return $user->hasPermissionTo('payrolls.create');
    }

    public function update($user, $model = null)
    {
        return $user->hasPermissionTo('payrolls.update');
    }

    public function delete($user, $model = null)
    {
        return $user->hasPermissionTo('payrolls.delete');
    }
}
