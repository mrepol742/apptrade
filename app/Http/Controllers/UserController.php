<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
    public function getUsers(Request $request)
    {
        $currentPage = (int) $request->input('page', 1);
        $query = User::with('department');
        $users = $query->paginate($this->items, ['*'], 'page', $currentPage);
        $total = (int) ceil($users->total() / $this->items);

        return response()->json([
            'data' => $users->items(),
            'totalPages' => $total,
            'currentPage' => $users->currentPage(),
        ]);
    }


    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:6',
            'department_id' => 'required|exists:departments,id',
            'email' => 'email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'role' => 'required|string|in:super_admin,admin,cashier,production,mc',
            'status' => 'required|string|in:active,inactive',
        ]);

        $user = User::create($request->all());

        return response()->json($user, 201);
    }
}
