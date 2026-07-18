import { useState } from "react";
import { Plus, Star, Bell } from "lucide-react";
import { StatCard } from "@/common";
import type { Student, Notice } from "@/types";
import ProfessorLayout from "@/layouts/professor-layout";

const students: Student[] = [
  { id: 1, name: "Ananya Sharma", roll: "CS21001", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", attendance: 92, grade: "A+", gpa: 9.4 },
  { id: 2, name: "Rohan Mehta", roll: "CS21002", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format", attendance: 84, grade: "A", gpa: 8.7 },
  { id: 3, name: "Priya Nair", roll: "CS21003", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format", attendance: 78, grade: "B+", gpa: 7.9 },
  { id: 4, name: "Aditya Verma", roll: "CS21004", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", attendance: 61, grade: "C", gpa: 6.1 },
  { id: 5, name: "Sneha Pillai", roll: "CS21005", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", attendance: 88, grade: "A−", gpa: 8.2 },
  { id: 6, name: "Karan Singh", roll: "CS21006", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", attendance: 55, grade: "D", gpa: 5.0 },
  { id: 7, name: "Meera Joshi", roll: "CS21007", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", attendance: 96, grade: "A+", gpa: 9.8 },
  { id: 8, name: "Dev Patel", roll: "CS21008", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", attendance: 73, grade: "B", gpa: 7.2 },
];

const notices: Notice[] = [
  { id: 1, title: "Mid-semester examination schedule released", target: "CS 3rd Year", date: "Nov 12, 2025", pinned: true },
  { id: 2, title: "Lab sessions rescheduled to Friday 2–4 PM", target: "CS-402 Batch A", date: "Nov 10, 2025", pinned: false },
  { id: 3, title: "Guest lecture: System Design at Scale", target: "All departments", date: "Nov 8, 2025", pinned: true },
  { id: 4, title: "Submission portal will be down Nov 14", target: "CS 3rd Year", date: "Nov 7, 2025", pinned: false },
];

export default function ProfDashboard() {
  const takeAttendance = () => {
    window.alert("Open the Attendance tab to mark attendance for the current class.");
  };

  const sendAlert = (name: string) => {
    window.alert(`Alert sent to ${name}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Good morning, Prof. Sharma</h1>
          <p className="text-sm text-muted-foreground mt-1">Monday, 18 November 2025 · Semester 5</p>
        </div>
        <button onClick={takeAttendance} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={14} /> Take Attendance
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value="62" sub="CS 3rd Year batch" icon={() => null} color="indigo" />
        <StatCard label="Avg. Attendance" value="81%" sub="↓ 2% from last week" icon={() => null} trend="down" color="orange" />
        <StatCard label="Avg. CGPA" value="7.9" sub="↑ 0.3 this semester" icon={() => null} trend="up" color="green" />
        <StatCard label="Pending Reviews" value="3" sub="assignments awaiting" icon={() => null} color="red" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Students at Risk</p>
            <span className="text-xs text-muted-foreground">Attendance &lt; 75%</span>
          </div>
          <div className="flex flex-col gap-3">
            {students.filter(s => s.attendance < 75).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{s.name}</p><p className="text-xs text-muted-foreground">{s.roll}</p></div>
                <div className="text-right"><p className={`text-sm font-bold ${s.attendance < 65 ? "text-red-400" : "text-orange-400"}`}>{s.attendance}%</p><p className="text-xs text-muted-foreground">attendance</p></div>
                <button onClick={() => sendAlert(s.name)} className="ml-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg hover:bg-primary/20 transition-colors whitespace-nowrap">Send Alert</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="font-semibold text-sm mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>This Week</p>
          <div className="flex flex-col gap-3">
            {[{ day: "Mon", time: "10:00", label: "CS-402 Lecture", type: "class" }, { day: "Tue", time: "14:00", label: "BST Assignment Due", type: "deadline" }, { day: "Wed", time: "11:00", label: "Lab — OS Scheduling", type: "lab" }, { day: "Thu", time: "09:30", label: "HOD Meeting", type: "meeting" }, { day: "Fri", time: "15:00", label: "Guest Lecture", type: "event" }].map(({ day, time, label, type }) => {
              const dot = { class: "bg-indigo-400", deadline: "bg-red-400", lab: "bg-blue-400", meeting: "bg-yellow-400", event: "bg-green-400" }[type];
              return (
                <div key={label} className="flex items-center gap-3">
                  <div className="text-center w-8 flex-shrink-0"><p className="text-[9px] text-muted-foreground uppercase">{day}</p><p className="text-xs font-medium">{time}</p></div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                  <p className="text-xs text-muted-foreground flex-1">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Recent Notices</p>
          <button onClick={() => window.alert("Open the Notices tab to review all recent notices.")} className="text-xs text-primary hover:underline">View all</button>
        </div>
        <div className="flex flex-col gap-2">
          {notices.slice(0, 3).map(n => (
            <div key={n.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors">
              {n.pinned ? <Star size={12} className="text-yellow-400 flex-shrink-0" /> : <Bell size={12} className="text-muted-foreground flex-shrink-0" />}
              <p className="text-sm flex-1 truncate">{n.title}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
ProfDashboard.layout = (page: React.ReactNode) => <ProfessorLayout children={page} />;
