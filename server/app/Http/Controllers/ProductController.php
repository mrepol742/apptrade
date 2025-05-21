<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * @var int
     */
    protected $items = 100;
    
    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProducts(Request $request)
    {
        $currentPage = (int) $request->input('page', 1);
        $query = Product::with(['group', 'department'])->orderBy('id', 'desc');
        $products = $query->paginate($this->items, ['*'], 'page', $currentPage);
        $total = (int) ceil($products->total() / $this->items);

        return response()->json([
            'data' => $products->items(),
            'totalPages' => $total,
            'currentPage' => $products->currentPage(),
        ]);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'code' => 'required|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'unit_measurement' => 'required|string|max:255',
            'is_active' => 'required|boolean',
            'default_quantity' => 'required|boolean',
            'group_id' => 'nullable|exists:groups,id',
            'age_restriction' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'taxes' => 'nullable|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'markup' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'color' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->default_quantity) {
            $request->merge(['quantity' => 0]);
        } else {
            $request->merge(['quantity' => $request->input('quantity', 0)]);
        }

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProduct(Request $request, $id)
    {
        $product = Product::where('id', $id)
            ->orWhere('name', $id)
            ->orWhere('code', $id)
            ->orWhere('barcode', $id)
            ->get();
        return response()->json($product);
    }
}
