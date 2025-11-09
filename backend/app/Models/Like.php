<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Like extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'liker_id',
        'liked_id',
    ];

    protected $casts = [
        'liker_id' => 'integer',
        'liked_id' => 'integer',
        'created_at' => 'datetime',
    ];

    /**
     * Get the person who liked
     */
    public function liker(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'liker_id');
    }

    /**
     * Get the person who was liked
     */
    public function liked(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'liked_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($like) {
            $like->created_at = now();
        });
    }
}
