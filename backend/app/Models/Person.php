<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Person extends Model
{
    protected $table = 'people';

    protected $fillable = [
        'name',
        'age',
        'location',
    ];

    protected $casts = [
        'age' => 'integer',
    ];

    /**
     * Get all pictures for this person
     */
    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class)->orderBy('order');
    }

    /**
     * Get people this person has liked
     */
    public function likedPeople(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'likes', 'liker_id', 'liked_id')
            ->withTimestamps();
    }

    /**
     * Get people this person has disliked
     */
    public function dislikedPeople(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'dislikes', 'disliker_id', 'disliked_id')
            ->withTimestamps();
    }

    /**
     * Get people who liked this person
     */
    public function likers(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'likes', 'liked_id', 'liker_id')
            ->withTimestamps();
    }
}
