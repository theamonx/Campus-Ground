<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::inertia('/', 'home')->name('home');
Route::inertia('/login', 'login')->name('login');
Route::get('/student', [StudentController::class, 'index']);
Route::inertia('/student/profile', 'student/StuProfile');
Route::inertia('/student/achievements', 'student/StuAchievements');
Route::inertia('/student/duels', 'student/StuDuels');
Route::inertia('/student/groups', 'student/StuGroups');
Route::inertia('/student/clubs', 'student/StuClubs');
Route::inertia('/student/events', 'student/StuEvents');
Route::inertia('/student/protests', 'student/StuProtests');
Route::inertia('/professor', 'professor/ProfDashboard')->name('professor');
Route::inertia('/professor/assignments', 'professor/ProfAssignments');
Route::inertia('/professor/attendance', 'professor/ProfAttendance');
Route::inertia('/professor/events', 'professor/ProfEvents');
Route::inertia('/professor/grades', 'professor/ProfGrades');
Route::inertia('/professor/groups', 'professor/ProfGroups');
Route::inertia('/professor/notices', 'professor/ProfNotices');
Route::inertia('/professor/resources', 'professor/ProfResources');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
