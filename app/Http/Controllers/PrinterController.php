<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrinterController extends Controller
{
    /**
     * Format receipt data for printing.
     *
     * @param array $data
     * @return string
     */
    public static function printReceipt($data)
    {
        return "
Products: " . json_encode($data['products']) . "
Total: {$data['total']}
Total Discount: {$data['total_discount']}
Total Taxes: {$data['total_taxes']}
Total Payment: {$data['total_payment']}
Total Change: {$data['total_change']}
Mode of Payment: {$data['mode_of_payment']}
Reference Number: {$data['reference_number']}
            ";
    }

    /**
     * Set the receipt printing status.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setStatus(Request $request)
    {
        $printerName = $request->input('printer_name');
        $status = $request->input('status');

        return response()->json(['status' => 'Printer status updated']);
    }

    /**
     * Set the default printer.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setPrinter(Request $request)
    {
        $printerName = $request->input('printer_name');
        $status = $request->input('status');

        return response()->json(['status' => 'Printer set']);
    }
}
