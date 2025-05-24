<?php

namespace App\Http\Controllers;

use App\Models\SaleLock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SalesLockController extends Controller
{
    public function getSalesLock(Request $request)
    {
        try {
            $salesLock = SaleLock::where('cashier_id', Auth::user()->id)
                ->orderBy('created_at', 'desc')
                ->first();
            return response()->json($salesLock->products ?? []);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function createSalesLock(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'products' => 'required|json',
                'mode' => 'required|boolean',
            ]);

            if ($validator->fails())
                return response()->json($validator->errors(), 422);

            if (!$request->mode) {
                $salesLock = SaleLock::where('cashier_id', Auth::user()->id)
                    ->orderBy('created_at', 'desc')
                    ->first();

                $salesLock->delete();
                return response()->json(['message' => 'Sales lock deleted successfully']);
            }
            $salesLock = SaleLock::create([
                'cashier_id' => Auth::user()->id,
                'products' => $request->products,
            ]);

            return response()->json($salesLock, 201);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
