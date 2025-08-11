<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user() || !$request->user()->hasAnyRole($roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Required roles: ' . implode(', ', $roles)
            ], 403);
        }

        return $next($request);
    }
}
