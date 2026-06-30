<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['tenant_id', 'first_name', 'last_name', 'grade' ])]
#[Table(key: 'student_id', timestamps: false)]

class Student extends Model
{
    use HasFactory;
}
