<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Thought;
use App\Models\User;

class StudentController extends Controller
{
    function index(){
        $thoughts = Thought::with('user')
            ->latest()
            ->take(50)  // Limit to 50 most recent chirps
            ->get();
        foreach ($thoughts as $message) {
            $message->relative_time = $message->created_at->diffForHumans(['short' => true]);
        }

        return Inertia::render('student/StuFeed', [
            'thoughts' => $thoughts,
        ]);
    }
}
