<?php
// app/Enums/UserRole.php

namespace App\Enums;

enum UserRole: string
{
    case Student = 'student';
    case Professor = 'professor';
    case Admin = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::Student => 'Student',
            self::Professor => 'Professor',
            self::Admin => 'Admin',
        };
    }
}
