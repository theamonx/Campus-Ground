<?php
// app/Http/Responses/LoginResponse.php

namespace App\Http\Responses;

use App\Enums\UserRole;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): mixed
    {
        $user = $request->user();

        if ($request->wantsJson()) {
            return response()->json(['two_factor' => false]);
        }

        return redirect()->intended(match ($user->role) {
            UserRole::Admin => route('admin.dashboard'),
            UserRole::Professor => route('professor'),
            UserRole::Student => route('student'),
        });
    }
}
