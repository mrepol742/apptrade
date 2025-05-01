<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'department_id',
        'code',
        'barcode',
        'unit_measurement',
        'is_active',
        'quantity',
        'group_id',
        'age_restriction',
        'description',
        'taxes',
        'cost_price',
        'markup',
        'sale_price',
        'color',
        'image',
    ];

    /**
     * Get the group associated with the product.
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the department associated with the user.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
