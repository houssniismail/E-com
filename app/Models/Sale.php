<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'qty',
        'size'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_sales');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'sale_products', 'sale_id', 'product_id');
    }

    public function saleProducts()
    {
        return $this->hasMany(SaleProduct::class);  
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
