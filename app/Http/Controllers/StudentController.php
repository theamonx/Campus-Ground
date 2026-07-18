<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    function index(){
        $thoughts = [
            {
            'id' => 1, 'author' => 'Meera Joshi', 'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format', 'handle' => '@meera.joshi', 'time' => '2m ago', 'type' => 'achievement', 'content' => 'Just cleared HackBit 2025 and placed 1st in the Systems track! 8 months of grinding finally paid off. Thank you @DevClub for the prep sessions 🏆', 'tag' => 'Achievement', 'likes' => 148, 'comments' => 24, 'liked' => false, 'saved' => false,
            },
            {
            'id' => 2, 'author' => 'Anonymous', 'avatar' => '', 'handle' => '@anon·protected', 'time' => '14m ago', 'type' => 'protest', 'content' => 'The library closes at 8 PM during exam week. That\'s actively hurting our preparation. We need 24-hour access at least during finals. Who\'s with me?', 'tag' => 'Protest', 'likes' => 312, 'comments' => 67, 'liked' => true, 'saved' => false, 'anon' => true
            },
            {
            'id' => 3, 'author' => 'Dev Club', 'avatar' => '', 'handle' => '@devclub.official', 'time' => '1h ago', 'type' => 'event', 'content' => 'Winter Hackathon registrations are open! 48 hours, ₹50,000 in prizes, and a chance to present to real VCs. Teams of 2–4. Last 30 spots left.', 'tag' => 'Event', 'likes' => 89, 'comments' => 15, 'liked' => false, 'saved' => true, 'image' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=280&fit=crop&auto=format'},
            {
            'id' => 4, 'author' => 'Rohan Mehta', 'avatar' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format', 'handle' => '@rohan.m', 'time' => '3h ago', 'type' => 'duel', 'content' => 'Just accepted @karan.s\'s LeetCode duel. Medium difficulty, 45 mins. Voting closes in 2 hours — who do you think solves it first? 🔥', 'tag' => 'Duel', 'likes' => 43, 'comments' => 19, 'liked' => false, 'saved' => false},
            {
            'id' => 5, 'author' => 'Ananya Sharma', 'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format', 'handle' => '@ananya.s', 'time' => '5h ago', 'type' => 'achievement', 'content' => 'Google Summer of Code 2025 acceptance just dropped into my inbox. Genuinely cannot believe it. Years of open source contributions — this is what it was for.', 'tag' => 'Achievement', 'likes' => 426, 'comments' => 58, 'liked' => true, 'saved' => true
            };
        ]
        return Inertia::render('student/StudentPage', [
            'thoughts' => $thoughts,
        ]);
    }
}
