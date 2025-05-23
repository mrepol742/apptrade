<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Rap2hpoutre\FastExcel\FastExcel;

class ExportController extends Controller
{
    public function exportUsers()
    {
        try {
            $data = [];
            $users = \App\Models\User::all();

            $data[] = array_keys($users->first()->toArray());

            foreach ($users as $user) {
                $data[] = $user->toArray();
            }

            return (new FastExcel(collect($data)))->download("users.xlsx");
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function exportProducts()
    {
        try {
            $data = [];
            $products = \App\Models\Product::all();

            $data[] = array_keys($products->first()->toArray());

            foreach ($products as $product) {
                $data[] = $product->toArray();
            }

            return (new FastExcel(collect($data)))->download("products.xlsx");
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function exportDepartments()
    {
        try {
            $data = [];
            $departments = \App\Models\Department::all();

            $data[] = array_keys($departments->first()->toArray());

            foreach ($departments as $department) {
                $data[] = $department->toArray();
            }

            return (new FastExcel(collect($data)))->download("departments.xlsx");
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
