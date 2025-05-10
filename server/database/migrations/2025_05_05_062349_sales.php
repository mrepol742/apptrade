<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->integer('cashier_id');
            $table->string('desktop_id');
            $table->integer('printer_id');
            $table->json('products');
            $table->integer('total');
            $table->integer('total_discount')->default(0);
            $table->integer('total_taxes')->default(0);
            $table->integer('total_payment')->default(0);
            $table->integer('total_change')->default(0);
            $table->string('mode_of_payment')->default(0);
            $table->string('reference_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
