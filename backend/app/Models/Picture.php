<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Picture extends Model
{
    protected $fillable = [
        'person_id',
        'image_url',
        'order',
    ];

    protected $casts = [
        'person_id' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Get the person that owns this picture
     */
    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}
