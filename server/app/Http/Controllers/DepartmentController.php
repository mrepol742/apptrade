<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

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
        $currentPage = $request->input('page');

        if (is_null($currentPage)) {
            $departments = Department::orderBy('id', 'desc')->get();

            return response()->json(
                $departments);
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
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createDepartment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
        ]);

        $department = Department::create($request->all());

        return response()->json($department, 201);
    }
}
