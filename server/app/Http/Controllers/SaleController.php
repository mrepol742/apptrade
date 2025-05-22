<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{

    public function getSales(Request $request)
    {
        $currentPage = (int) $request->input('page', 1);
        $query = Sale::with(['cashier'])->orderBy('id', 'desc');
        $sales = $query->paginate(100, ['*'], 'page', $currentPage);
        $total = (int) ceil($sales->total() / 100);

        return response()->json([
            'data' => $sales->items(),
            'totalPages' => $total,
            'currentPage' => $sales->currentPage(),
        ]);
    }

    public function checkout(Request $request)
    {
        $data =  [
            'cashier_id' => Auth::user()->id,
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
            'data' => $data
        ]);
    }
}
