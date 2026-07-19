<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Thought extends Model
{
    protected $fillable = [
        'message',
        'type',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
