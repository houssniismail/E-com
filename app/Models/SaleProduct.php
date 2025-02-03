<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleProduct extends Model
{
    protected $table = 'sale_products'; // Explicitly defining the table name (optional)

    protected $fillable = [
        'product_id',
        'sale_id',
    ];

    /**
     * Get the product associated with the sale.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the sale associated with the product.
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }
}
