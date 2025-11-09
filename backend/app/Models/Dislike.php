<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dislike extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'disliker_id',
        'disliked_id',
    ];

    protected $casts = [
        'disliker_id' => 'integer',
        'disliked_id' => 'integer',
        'created_at' => 'datetime',
    ];

    /**
     * Get the person who disliked
     */
    public function disliker(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'disliker_id');
    }

    /**
     * Get the person who was disliked
     */
    public function disliked(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'disliked_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($dislike) {
            $dislike->created_at = now();
        });
    }
}
