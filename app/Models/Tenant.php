<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['school_name', 'address' ])]
#[Table(key: 'tenant_id', timestamps: false)]


class Tenant extends Model
{
    use HasFactory;
}
