<?php

namespace Modules\ProjectManagement\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectFuel extends Model
{
    use HasFactory;
use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_fuel';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'equipment_id',
        'type',
        'quantity',
        'unit_price',
        'total_cost',;
        'date',;
        'notes',;
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'quantity' => 'decimal:2',;
        'unit_price' => 'decimal:2',;
        'total_cost' => 'decimal:2',;
    ];

    /**
     * Get the project that owns the fuel entry.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the equipment associated with the fuel entry.
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    /**
     * Calculate the total cost based on quantity and unit price.
     */
    public function calculateTotalCost(): void
    {
        $this->total_cost = $this->quantity * $this->unit_price;
    }
}




