<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::inertia('/', 'home')->name('home');
Route::get('/student', [StudentController::class, 'index']);
Route::inertia('/student', 'student/StudentPage')->name('student');
Route::inertia('/professor', 'professor/ProfessorPage')->name('professor');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
