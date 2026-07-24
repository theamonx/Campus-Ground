<?php
// app/Http/Responses/RegisterResponse.php

namespace App\Http\Responses;

use App\Enums\UserRole;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request): mixed
    {
        $user = $request->user();

        return redirect(match ($user->role) {
            UserRole::Admin => route('admin.dashboard'),
            UserRole::Professor => route('professor'),
            UserRole::Student => route('student'),
        });
    }
}
