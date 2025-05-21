<?php

namespace Modules\Core\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * The model instance.
     *
     * @var Model
     */
    protected $model;

    /**
     * Create a new repository instance.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records.
     *
     * @return mixed;
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a record by ID.
     *
     * @param int $id
     * @return mixed;
     */
    public function find($id)
    {
        // Validate ID is numeric before querying to prevent PostgreSQL errors
        if (!is_numeric($id)) {
            return null;
        }
        return $this->model->find($id);
    }

    /**
     * Create a new record.
     *
     * @param array $data
     * @return mixed;
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Update a record.
     *
     * @param int $id
     * @param array $data
     * @return mixed;
     */
    public function update($id, array $data)
    {
        // Validate ID is numeric before proceeding
        if (!is_numeric($id)) {
            return false;
        }

        $record = $this->find($id);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return false;
    }

    /**
     * Delete a record.
     *
     * @param int $id
     * @return bool;
     */
    public function delete($id)
    {
        // Validate ID is numeric before proceeding
        if (!is_numeric($id)) {
            return false;
        }

        $record = $this->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }
}


