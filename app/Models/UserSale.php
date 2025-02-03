<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSale extends Model
{
    protected $table = 'user_sales'; // Explicitly defining the table name (optional)

    protected $fillable = [
        'user_id',
        'sale_id',
    ];

    /**
     * Get the user associated with the sale.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sale associated with the user.
     */
    public function sale()
{
    return $this->belongsTo(Sale::class);
}

    // public function sale()
    // {
    //     return $this->belongsTo(Sale::class);
    // }
}
