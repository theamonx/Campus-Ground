<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;


#[Fillable(['tenant_id', 'course_name', 'teacher_id'])]
#[Table(key: 'course_id', timestamps: false)]
class Course extends Model
{
    use HasFactory;


}
