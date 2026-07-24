<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public homepage — unchanged
Route::inertia('/', 'home')->name('home');

// Admin only
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin', fn () => Inertia::render('admin/dashboard'))->name('admin.dashboard');
});

// Professor only
Route::middleware(['auth', 'verified', 'role:professor'])->prefix('professor')->group(function () {
    Route::inertia('/', 'professor/ProfDashboard')->name('professor');
    Route::inertia('/assignments', 'professor/ProfAssignments');
    Route::inertia('/attendance', 'professor/ProfAttendance');
    Route::inertia('/events', 'professor/ProfEvents');
    Route::inertia('/grades', 'professor/ProfGrades');
    Route::inertia('/groups', 'professor/ProfGroups');
    Route::inertia('/notices', 'professor/ProfNotices');
    Route::inertia('/resources', 'professor/ProfResources');
});

// Student only
Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('student');
    Route::inertia('/profile', 'student/StuProfile');
    Route::inertia('/achievements', 'student/StuAchievements');
    Route::inertia('/duels', 'student/StuDuels');
    Route::inertia('/groups', 'student/StuGroups');
    Route::inertia('/clubs', 'student/StuClubs');
    Route::inertia('/events', 'student/StuEvents');
    Route::inertia('/protests', 'student/StuProtests');
});

// Generic authenticated dashboard, if still used anywhere
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
