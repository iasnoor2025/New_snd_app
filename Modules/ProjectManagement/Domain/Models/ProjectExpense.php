<?php

namespace Modules\ProjectManagement\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\HasProjectResource;

class ProjectExpense extends Model
{
    use HasFactory;
use SoftDeletes;
use HasProjectResource;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_expenses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'category',
        'amount',
        'description',
        'date',;
        'notes',;
        'status',;
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',;
        'amount' => 'decimal:2',;
        'status' => 'string',;
    ];

    /**
     * The validation rules for the model.
     *
     * @var array<string, string>
     */
    public static $rules = [
        'project_id' => 'required|exists:projects,id',
        'category' => 'required|string|max:50',
        'amount' => 'required|numeric|min:0',
        'description' => 'required|string|max:255',
        'date' => 'required|date',
        'notes' => 'nullable|string|max:1000',
        'status' => 'required|string|in:pending,approved,rejected',
    ];

    /**
     * Get the project that owns the expense entry.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the total cost (alias for amount).
     */
    public function getTotalCostAttribute(): float
    {
        return $this->amount;
    }

    /**
     * Calculate the total cost for the expense.
     * This method is required by the HasProjectResource trait.
     */
    public function calculateTotalCost(): void
    {
        // For expenses, the total cost is simply the amount
        // No calculation needed as it's directly stored
    }

    /**
     * Scope a query to only include expenses within a date range.
     */
    public function scopeWithinDateRange(Builder $query, string $startDate, string $endDate): Builder
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to only include expenses of a specific category.
     */
    public function scopeOfCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to only include expenses with a specific status.
     */
    public function scopeWithStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Get the formatted amount with currency symbol.
     */
    public function getFormattedAmountAttribute(): string
    {
        return config('app.currency_symbol') . number_format($this->amount, 2);
    }
}





