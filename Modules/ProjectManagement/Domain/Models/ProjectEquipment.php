<?php

namespace Modules\ProjectManagement\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectEquipment extends Model
{
    use HasFactory;
use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_equipment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'project_id',
        'equipment_id',
        'start_date',
        'end_date',
        'usage_hours',
        'hourly_rate',
        'maintenance_cost',
        'total_cost',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'usage_hours' => 'decimal:2',
        'hourly_rate' => 'decimal:2',
        'maintenance_cost' => 'decimal:2',
        'total_cost' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->calculateTotalCost();
        });

        static::updating(function ($model) {
            $model->calculateTotalCost();
        });
    }

    /**
     * Get the project that owns the equipment.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the equipment details.
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    /**
     * Calculate the total cost for this equipment.
     *
     * @return void;
     */
    public function calculateTotalCost(): void
    {
        $this->total_cost = ($this->usage_hours * $this->hourly_rate) + $this->maintenance_cost;
    }
}




