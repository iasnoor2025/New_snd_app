<?php

namespace Modules\Payroll\app\Policies;

class PayrollPolicy
{
    // Add your policy methods here as needed
    public function viewAny($user)
    {
        return true;
    }

    public function view($user, $model = null)
    {
        return true;
    }

    public function create($user)
    {
        return true;
    }

    public function update($user, $model = null)
    {
        return true;
    }

    public function delete($user, $model = null)
    {
        return true;
    }
}
