<?php

namespace Modules\Core\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'category_type', // e.g. 'equipment', 'inventory', etc.
        'description',
    ];
}
