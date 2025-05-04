<?php
namespace App\Http\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle login request and return a session token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string|exists:users,username',
            'password' => 'required|string|min:6',
        ]);

        if (Auth::attempt($request->only('username', 'password'))) {
            $request->session()->regenerate();
            return response()->json([
                'message' => 'Login successful',
                'session_token' => Session::getId(),
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    /**
     * Handle login request and return a session token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifySession(Request $request)
    {
        $sessionId = $request->input('session_id');

        if (Session::getId() === $sessionId && Auth::check()) {
            return response()->json([
                'message' => 'Session is active',
                'user' => Auth::user()
            ]);
        }

        return response()->json(['message' => 'Session is inactive or invalid'], 401);
    }

    /**
     * Handle login request and return a session token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful']);
    }
}