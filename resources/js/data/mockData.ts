import { Student, Assignment, Notice, Event, Post, Duel, Club, Protest, Achievement } from "../types";

export const students: Student[] = [
  { id: 1, name: "Ananya Sharma", roll: "CS21001", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", attendance: 92, grade: "A+", gpa: 9.4 },
  { id: 2, name: "Rohan Mehta", roll: "CS21002", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format", attendance: 84, grade: "A", gpa: 8.7 },
  { id: 3, name: "Priya Nair", roll: "CS21003", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format", attendance: 78, grade: "B+", gpa: 7.9 },
  { id: 4, name: "Aditya Verma", roll: "CS21004", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", attendance: 61, grade: "C", gpa: 6.1 },
  { id: 5, name: "Sneha Pillai", roll: "CS21005", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", attendance: 88, grade: "A−", gpa: 8.2 },
  { id: 6, name: "Karan Singh", roll: "CS21006", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", attendance: 55, grade: "D", gpa: 5.0 },
  { id: 7, name: "Meera Joshi", roll: "CS21007", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", attendance: 96, grade: "A+", gpa: 9.8 },
  { id: 8, name: "Dev Patel", roll: "CS21008", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", attendance: 73, grade: "B", gpa: 7.2 },
];

export const assignments: Assignment[] = [
  { id: 1, title: "Binary Search Tree Implementation", subject: "Data Structures", due: "Nov 20, 2025", submitted: 38, total: 62, status: "active" },
  { id: 2, title: "ER Diagram for Hospital DB", subject: "DBMS", due: "Nov 18, 2025", submitted: 62, total: 62, status: "closed" },
  { id: 3, title: "Process Scheduling Simulation", subject: "OS", due: "Nov 25, 2025", submitted: 12, total: 62, status: "active" },
  { id: 4, title: "TCP/IP Layer Analysis", subject: "Computer Networks", due: "Dec 2, 2025", submitted: 0, total: 62, status: "draft" },
];

export const notices: Notice[] = [
  { id: 1, title: "Mid-semester examination schedule released", target: "CS 3rd Year", date: "Nov 12, 2025", pinned: true },
  { id: 2, title: "Lab sessions rescheduled to Friday 2–4 PM", target: "CS-402 Batch A", date: "Nov 10, 2025", pinned: false },
  { id: 3, title: "Guest lecture: System Design at Scale", target: "All departments", date: "Nov 8, 2025", pinned: true },
  { id: 4, title: "Submission portal will be down Nov 14", target: "CS 3rd Year", date: "Nov 7, 2025", pinned: false },
];

export const profEvents: Event[] = [
  { id: 1, title: "TechFest 2025 — Annual Tech Festival", date: "Dec 10–12, 2025", venue: "Main Auditorium", registered: 840, capacity: 1200 },
  { id: 2, title: "Industry Connect: Google Campus Visit", date: "Nov 28, 2025", venue: "Seminar Hall B", registered: 60, capacity: 60 },
  { id: 3, title: "Hackathon Prelims — Round 1", date: "Nov 22, 2025", venue: "Lab Block 3", registered: 124, capacity: 200 },
];

export const feedPosts: Post[] = [
  { id: 1, author: "Meera Joshi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", handle: "@meera.joshi", time: "2m ago", type: "achievement", content: "Just cleared HackBit 2025 and placed 1st in the Systems track! 8 months of grinding finally paid off. Thank you @DevClub for the prep sessions 🏆", tag: "Achievement", likes: 148, comments: 24, liked: false, saved: false },
  { id: 2, author: "Anonymous", avatar: "", handle: "@anon·protected", time: "14m ago", type: "protest", content: "The library closes at 8 PM during exam week. That's actively hurting our preparation. We need 24-hour access at least during finals. Who's with me?", tag: "Protest", likes: 312, comments: 67, liked: true, saved: false, anon: true },
  { id: 3, author: "Dev Club", avatar: "", handle: "@devclub.official", time: "1h ago", type: "event", content: "Winter Hackathon registrations are open! 48 hours, ₹50,000 in prizes, and a chance to present to real VCs. Teams of 2–4. Last 30 spots left.", tag: "Event", likes: 89, comments: 15, liked: false, saved: true, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=280&fit=crop&auto=format" },
  { id: 4, author: "Rohan Mehta", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format", handle: "@rohan.m", time: "3h ago", type: "duel", content: "Just accepted @karan.s's LeetCode duel. Medium difficulty, 45 mins. Voting closes in 2 hours — who do you think solves it first? 🔥", tag: "Duel", likes: 43, comments: 19, liked: false, saved: false },
  { id: 5, author: "Ananya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", handle: "@ananya.s", time: "5h ago", type: "achievement", content: "Google Summer of Code 2025 acceptance just dropped into my inbox. Genuinely cannot believe it. Years of open source contributions — this is what it was for.", tag: "Achievement", likes: 426, comments: 58, liked: true, saved: true },
];

export const duels: Duel[] = [
  { id: 1, challenger: "Rohan Mehta", challengerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format", opponent: "Karan Singh", opponentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", topic: "LeetCode — Two Sum variants", category: "Coding", status: "active", votes: [68, 42], endsIn: "1h 48m" },
  { id: 2, challenger: "Meera Joshi", challengerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", opponent: "You", opponentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format", topic: "OS: Scheduling Algorithms Quiz", category: "Quiz", status: "pending", votes: [0, 0] },
  { id: 3, challenger: "Aditya Verma", challengerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", opponent: "Dev Patel", opponentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", topic: "Debate: AI will replace developers", category: "Debate", status: "ended", votes: [112, 88] },
];

export const clubs: Club[] = [
  { id: 1, name: "Dev Club", emoji: "💻", members: 320, category: "Tech", joined: true, desc: "Coding, hackathons, and open source." },
  { id: 2, name: "Photography Society", emoji: "📷", members: 145, category: "Creative", joined: true, desc: "Weekly photowalks, workshops, and exhibitions." },
  { id: 3, name: "Robotics Club", emoji: "🤖", members: 88, category: "Tech", joined: false, desc: "Build bots, compete nationally." },
  { id: 4, name: "Debating Society", emoji: "🎙", members: 210, category: "Culture", joined: false, desc: "Motion-based debates, national competitions." },
  { id: 5, name: "E-Cell", emoji: "🚀", members: 190, category: "Business", joined: true, desc: "Startup culture, pitch nights, VC connects." },
  { id: 6, name: "Music Club", emoji: "🎵", members: 160, category: "Arts", joined: false, desc: "Jam sessions, inter-college fests, studios." },
];

export const protests: Protest[] = [
  { id: 1, title: "24-hour library access during exam week", support: 847, comments: 134, status: "escalated", anon: false, time: "2 days ago", body: "The library consistently closes at 8 PM even during finals week. Students from hostels have no quiet study space after that. We are requesting the administration to extend hours to at least midnight, or ideally 24 hours, from 3 days before exams." },
  { id: 2, title: "Canteen food quality and hygiene standards", support: 412, comments: 89, status: "active", anon: true, time: "4 days ago", body: "Multiple students have reported digestive issues after meals at Canteen 2. The hygiene inspection was last done 8 months ago. We are demanding an immediate third-party inspection and a visible hygiene certificate." },
  { id: 3, title: "Fix the broken ACs in Lab Block 3", support: 203, comments: 41, status: "resolved", anon: false, time: "1 week ago", body: "Lab Block 3 AC units have been broken for 6 weeks during summer. This was reported to maintenance on Nov 1 with no response." },
];

export const achievements: Achievement[] = [
  { id: 1, title: "Google Summer of Code 2025", category: "Internship", date: "Nov 2025", icon: "🌟", points: 500, verified: true },
  { id: 2, title: "HackBit 2025 — 2nd Place", category: "Hackathon", date: "Oct 2025", icon: "🏅", points: 350, verified: true },
  { id: 3, title: "Published on Medium (10k reads)", category: "Writing", date: "Sep 2025", icon: "✍️", points: 200, verified: false },
  { id: 4, title: "AWS Certified Cloud Practitioner", category: "Certification", date: "Aug 2025", icon: "☁️", points: 280, verified: true },
  { id: 5, title: "Open Source — 50 PRs Merged", category: "Open Source", date: "Jul 2025", icon: "🔧", points: 320, verified: false },
];
