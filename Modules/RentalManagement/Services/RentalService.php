<?php
namespace Modules\RentalManagement\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\RentalManagement\App\DTOs\RentalDTO;
use Modules\RentalManagement\App\Repositories\Interfaces\RentalRepositoryInterface;
use Modules\RentalManagement\App\Events\RentalCreated;
use Modules\RentalManagement\App\Events\RentalUpdated;
use Modules\RentalManagement\App\Events\RentalDeleted;

class RentalService
{
    /**
     * @param RentalRepositoryInterface $repository
     */
    public function __construct(
        private readonly RentalRepositoryInterface $repository
    ) {}

    /**
     * Get all rentals
     *
     * @return Collection;
     */
    public function getAllRentals(): Collection
    {
        return $this->repository->all();
    }

    /**
     * Get paginated rentals
     *
     * @param int $perPage
     * @return LengthAwarePaginator;
     */
    public function getPaginatedRentals(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage);
    }

    /**
     * Get rental by ID
     *
     * @param int $id
     * @return Model|null;
     */
    public function getRentalById(int $id): ?Model
    {
        return $this->repository->find($id);
    }

    /**
     * Create new rental
     *
     * @param RentalDTO $dto
     * @return Model;
     */
    public function createRental(RentalDTO $dto): Model
    {
        $rental = $this->repository->create($dto->toArray());

        event(new RentalCreated($rental));

        return $rental;
    }

    /**
     * Update rental
     *
     * @param int $id
     * @param RentalDTO $dto
     * @return Model;
     */
    public function updateRental(int $id, RentalDTO $dto): Model
    {
        $rental = $this->repository->update($id, $dto->toArray());

        event(new RentalUpdated($rental));

        return $rental;
    }

    /**
     * Delete rental
     *
     * @param int $id
     * @return bool;
     */
    public function deleteRental(int $id): bool
    {
        $rental = $this->repository->findOrFail($id);
        $result = $this->repository->delete($id);

        if ($result) {
            event(new RentalDeleted($rental));
        }

        return $result;
    }

    /**
     * Get active rentals
     *
     * @return Collection;
     */
    public function getActiveRentals(): Collection
    {
        return $this->repository->getActive();
    }

    /**
     * Get completed rentals
     *
     * @return Collection;
     */
    public function getCompletedRentals(): Collection
    {
        return $this->repository->getCompleted();
    }

    /**
     * Get rentals by status
     *
     * @param string $status
     * @return Collection;
     */
    public function getRentalsByStatus(string $status): Collection
    {
        return $this->repository->getByStatus($status);
    }
}


