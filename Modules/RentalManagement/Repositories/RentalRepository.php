<?php
namespace Modules\RentalManagement\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\RentalManagement\Repositories\Interfaces\RentalRepositoryInterface;

class RentalRepository implements RentalRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * RentalRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * {@inheritdoc}
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * {@inheritdoc}
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->paginate($perPage);
    }

    /**
     * {@inheritdoc}
     */
    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findOrFail(int $id): Model
    {
        return $this->model->findOrFail($id);
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * {@inheritdoc}
     */
    public function update(int $id, array $data): Model
    {
        $model = $this->findOrFail($id);
        $model->update($data);
        return $model;
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id): bool
    {
        return $this->model->destroy($id) > 0;
    }

    /**
     * {@inheritdoc}
     */
    public function getActive(): Collection
    {
        return $this->model->where('status', 'active')->get();
    }

    /**
     * {@inheritdoc}
     */
    public function getCompleted(): Collection
    {
        return $this->model->where('status', 'completed')->get();
    }

    /**
     * {@inheritdoc}
     */
    public function getByStatus(string $status): Collection
    {
        return $this->model->where('status', $status)->get();
    }
}

