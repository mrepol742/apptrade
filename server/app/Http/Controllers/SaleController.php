<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Pail\Contracts\Printer;

class SaleController extends Controller
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
                'cashier' => Auth::user(),
                'products' => $request->input('products'),
                'total' => $request->input('total'),
                'total_discount' => $request->input('total_discount'),
                'total_taxes' => $request->input('total_taxes'),
                'total_payment' => $request->input('total_payment'),
                'total_change' => $request->input('total_change'),
                'mode_of_payment' => $request->input('mode_of_payment'),
                'reference_number' => $request->input('reference_number'),
            ];
            Sale::create($data);
            return response()->json([
                'message' => 'Checkout successful',
                'business' => [
                    'name' => config('business.name'),
                    'address' => config('business.address'),
                    'phone' => config('business.phone'),
                    'email' => config('business.email'),
                    'website' => config('business.website'),
                    'tax_id' => config('business.tax_id'),
                ],
                'receipt' => PrinterController::printReceipt($data),
            ]);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
