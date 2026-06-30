<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['tenant_id', 'first_name', 'last_name', 'subject' ])]
#[Table(key: 'teacher_id', timestamps: false)]


class Teacher extends Model
{
    use HasFactory;
}
