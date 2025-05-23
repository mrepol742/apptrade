<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DepartmentController extends Controller
{
    /**
     * @var int
     */
    protected $items = 15;

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDepartments(Request $request)
    {
        try {
            $currentPage = $request->input('page');

            if (is_null($currentPage)) {
                $departments = Department::orderBy('id', 'desc')->get();

                return response()->json(
                    $departments
                );
            }

            $currentPage = (int) $currentPage;
            $query = Department::orderBy('id', 'desc');
            $departments = $query->paginate($this->items, ['*'], 'page', $currentPage);
            $total = (int) ceil($departments->total() / $this->items);

            return response()->json([
                'data' => $departments->items(),
                'totalPages' => $total,
                'currentPage' => $departments->currentPage(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createDepartment(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:departments,name',
            ]);

            $department = Department::create($request->all());

            return response()->json($department, 201);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
