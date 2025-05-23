<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Pail\Contracts\Printer;

class SalesController extends Controller
{

    public function getSales(Request $request)
    {
        try {
            $currentPage = (int) $request->input('page', 1);
            $query = Sale::with(['cashier'])->orderBy('id', 'desc');
            $sales = $query->paginate(100, ['*'], 'page', $currentPage);
            $total = (int) ceil($sales->total() / 100);

            return response()->json([
                'data' => $sales->items(),
                'totalPages' => $total,
                'currentPage' => $sales->currentPage(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function checkout(Request $request)
    {
        try {
            $data =  [
                'products' => $request->input('products'),
                'total' => $request->input('total'),
                'total_discount' => $request->input('total_discount'),
                'total_taxes' => $request->input('total_taxes'),
                'total_payment' => $request->input('total_payment'),
                'total_change' => $request->input('total_change'),
                'mode_of_payment' => $request->input('mode_of_payment'),
                'reference_number' => time(),
            ];
            $sale = Sale::create(['cashier_id' => Auth::user()->id, ...$data]);
            return response()->json([
                'message' => 'Checkout successful',
                'business' => [
                    'name' => config('business.name'),
                    'address' => config('business.address'),
                    'phone' => config('business.phone'),
                    'email' => config('business.email'),
                    'website' => config('business.website'),
                    'tax_id' => config('business.tax_id'),
                    'vat_id' => config('business.vat_id'),
                ],
                'receipt' => [
                    'id' => $sale->id,
                    'transaction_number' => str_pad($sale->id, 12, '0', STR_PAD_LEFT),
                    'cashier' => Auth::user(),
                    ...$data
                ],
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
