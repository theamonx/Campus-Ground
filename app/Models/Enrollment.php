<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['tenant_id', 'student_id', 'course_id', 'enrollment_date' ])]
#[Table(key: 'enrollment_id', timestamps: false)]


class Enrollment extends Model
{
    use HasFactory;
}
