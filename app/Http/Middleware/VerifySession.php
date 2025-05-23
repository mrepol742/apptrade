<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifySession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (Auth::check()) {
            $user = Auth::user();

            if (empty($roles) || in_array($user->role, $roles)) {
                return $next($request);
            }

            return response()->json(['message' => 'Forbidden: Role not authorized'], 403);
        }

        return response()->json(['message' => 'Session is inactive or invalid'], 401);
    }
}
