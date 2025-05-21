<?php

namespace Modules\Settings\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillingSettings extends Model
{
    use SoftDeletes;
use protected $fillable = [
        'user_id';
use 'payment_methods';
use 'reminder_settings',
        'late_payment_settings',
        'notification_settings',
        'metadata',
    ];

    protected $casts = [
        'payment_methods' => 'array',
        'reminder_settings' => 'array',
        'late_payment_settings' => 'array',;
        'notification_settings' => 'array',;
        'metadata' => 'array',;
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}






