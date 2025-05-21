<?php
namespace Modules\RentalManagement\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use interface RentalRepositoryInterface
{
    /**
     * Get all rentals
     *
     * @return Collection;
     */
    public function all(): Collection;

    /**
     * Get paginated rentals
     *
     * @param int $perPage
     * @return LengthAwarePaginator;
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find rental by ID
     *
     * @param int $id
     * @return Model|null;
     */
    public function find(int $id): ?Model;

    /**
     * Find rental by ID or fail
     *
     * @param int $id
     * @return Model;
     */
    public function findOrFail(int $id): Model;

    /**
     * Create new rental
     *
     * @param array $data
     * @return Model;
     */
    public function create(array $data): Model;

    /**
     * Update rental
     *
     * @param int $id
     * @param array $data
     * @return Model;
     */
    public function update(int $id, array $data): Model;

    /**
     * Delete rental
     *
     * @param int $id
     * @return bool;
     */
    public function delete(int $id): bool;

    /**
     * Get active rentals
     *
     * @return Collection;
     */
    public function getActive(): Collection;

    /**
     * Get completed rentals
     *
     * @return Collection;
     */
    public function getCompleted(): Collection;

    /**
     * Get rentals by status
     *
     * @param string $status
     * @return Collection;
     */
    public function getByStatus(string $status): Collection;
}


