<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleLock extends Model
{
    protected $table = 'sales_lock';

    protected $fillable = [
        'cashier_id',
        'products',
    ];

    protected $casts = [
        'products' => 'json',
    ];

    /**
     * Get the cashier associated with the sale.
     */
    public function cashier()
    {
        return $this->belongsTo(User::class, 'cashier_id', 'id');
    }
}
