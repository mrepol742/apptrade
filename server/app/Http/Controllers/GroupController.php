<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        try {
            $groups = Group::orderBy('id', 'desc')
                ->get();
            return response()->json($groups);
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
    public function addGroup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|exists:groups,name',
                'description' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails())
                return response()->json($validator->errors(), 422);

            Group::create($request->all());
            return response()->json(['message' => 'Group created successfully'], 201);
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
    public function updateGroup(Request $request, $id)
    {
        try {
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
    public function deleteGroup($id)
    {
        try {
            $group = Group::find($id);
            if (!$group)
                return response()->json(['message' => 'Group not found'], 404);

            $group->delete();
            return response()->json(['message' => 'Group deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error handling request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
