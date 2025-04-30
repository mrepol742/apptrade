<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGroups(Request $request)
    {
        $groups = Group::orderBy('id', 'desc')
        ->get();
        return response()->json($groups);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addGroup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|exists:groups,name',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        Group::create($request->all());
        return response()->json(['message' => 'Group created successfully'], 201);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateGroup(Request $request, $id)
    {
        $group = Group::find($id);
        if (!$group)
            return response()->json(['message' => 'Group not found'], 404);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|exists:groups,name',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $group->update($request->all());
        return response()->json(['message' => 'Group updated successfully'], 200);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteGroup($id)
    {
        $group = Group::find($id);
        if (!$group)
            return response()->json(['message' => 'Group not found'], 404);

        $group->delete();
        return response()->json(['message' => 'Group deleted successfully'], 200);
    }
}
