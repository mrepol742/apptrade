<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrinterController extends Controller
{
    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPrinters(Request $request)
    {
        try {
            $printers = shell_exec('wmic printer get Name,Description,Default,Status /format:csv');
            if ($printers === null) 
            return response()->json(['error' => 'Unable to fetch printers'], 500);

            $lines = explode("\n", trim($printers));
            $headers = [];
            $data = [];

            foreach ($lines as $index => $line) {
            $columns = array_map('trim', explode(',', $line));
            if ($index === 0) {
                $headers = $columns;
            } else {
                if (count($columns) === count($headers)) {
                $data[] = array_combine($headers, $columns);
                }
            }
            }

            return response()->json(['printers' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    // SHOULD BE PROCERSS INTERNALLY
    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function print(Request $request)
    {
        $printerName = $request->input('printer');
        $filePath = $request->input('file');
    
        if (!$printerName || !$filePath)
            return response()->json(['error' => 'Printer name and file path are required'], 400);
    
        if (!file_exists($filePath))
            return response()->json(['error' => 'File does not exist'], 400);
    
        try {
            $command = sprintf('print /D:"%s" "%s"', escapeshellarg($printerName), escapeshellarg($filePath));
            $output = shell_exec($command);
    
            if ($output === null)
                return response()->json(['error' => 'Failed to send print job'], 500);
    
            return response()->json(['message' => 'Print job sent successfully', 'output' => $output]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}
