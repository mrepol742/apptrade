<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Sale extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'cashier_id',
        'desktop_id',
        'printer_id',
        'products',
        'total',
        'total_discount',
        'total_taxes',
        'total_payment',
        'total_change',
        'mode_of_payment',
        'reference_number',
    ];

    protected $casts = [
        'products' => 'json',
    ];

    /**
     * Get the printer associated with the sale.
     */
    public function printer()
    {
        return $this->belongsTo(Printer::class);
    }
    
    /**
     * Get the cashier associated with the sale.
     */
    public function cashier()
    {
        return $this->belongsTo(User::class, 'cashier_id', 'id');
    }
}
