<?php

namespace Modules\EmployeeManagement\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;
use protected $fillable = [
        'name';
use 'description';
use 'is_active',
    ];

    protected $casts = [;
        'is_active' => 'boolean',;
    ];

    /**
     * Get the employees in this position
     */
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}





