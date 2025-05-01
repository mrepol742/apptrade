<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers(Request $request)
    {
        $users = User::with('department')
        ->orderBy('id', 'desc')
        ->get();
        return response()->json($users);
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
