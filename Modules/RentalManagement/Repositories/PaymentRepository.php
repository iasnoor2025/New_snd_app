<?php

namespace Modules\RentalManagement\Repositories;

use Modules\Core\Repositories\BaseRepository;
use Modules\RentalManagement\Domain\Models\Payment;

class PaymentRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param Payment $model
     */
    public function __construct(Payment $model)
    {
        parent::__construct($model);
    }

    /**
     * Get payments by status.
     *
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Collection;
     */
    public function getByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    /**
     * Get pending payments.
     *
     * @return \Illuminate\Database\Eloquent\Collection;
     */
    public function getPending()
    {
        return $this->getByStatus('pending');
    }

    /**
     * Get completed payments.
     *
     * @return \Illuminate\Database\Eloquent\Collection;
     */
    public function getCompleted()
    {
        return $this->getByStatus('completed');
    }

    /**
     * Get payments for a specific rental.
     *
     * @param int $rentalId
     * @return \Illuminate\Database\Eloquent\Collection;
     */
    public function getByRentalId(int $rentalId)
    {
        return $this->model->where('rental_id', $rentalId)->get();
    }
}


