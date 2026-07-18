import { useState } from "react";
import { Plus, Check, X, UserCheck, UserX, MoreHorizontal } from "lucide-react";
import { StatCard } from "@/common";
import type { Student } from "@/types";

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

export function ProfAttendance() {
  const [taking, setTaking] = useState(false);
  const [present, setPresent] = useState<Set<number>>(new Set([1, 2, 3, 5, 7]));
  const toggle = (id: number) => setPresent(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Attendance</h1><p className="text-sm text-muted-foreground mt-1">CS-402 · Data Structures · Sem 5</p></div>
        <button onClick={() => setTaking(!taking)} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          {taking ? <><Check size={14} />Save Attendance</> : <><Plus size={14} />Take Attendance</>}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Classes" value="45" sub="this semester" icon={() => null} color="indigo" />
        <StatCard label="Avg. Attendance" value="81%" sub="batch average" icon={() => null} trend="up" color="green" />
        <StatCard label="Below 75%" value="3" sub="students at risk" icon={() => null} color="red" />
        <StatCard label="Today Present" value={`${present.size}`} sub={`of ${students.length}`} icon={() => null} color="orange" />
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <p className="font-semibold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{taking ? "Today · 18 Nov 2025 — Mark Attendance" : "Student Attendance Overview"}</p>
          {taking && <div className="flex gap-2 text-xs">
            <button onClick={() => setPresent(new Set(students.map(s => s.id)))} className="flex items-center gap-1 text-green-400 hover:underline"><UserCheck size={11} />All Present</button>
            <span className="text-border">|</span>
            <button onClick={() => setPresent(new Set())} className="flex items-center gap-1 text-red-400 hover:underline"><UserX size={11} />All Absent</button>
          </div>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">{(taking ? ["Student", "Roll No.", "Status", ""] : ["Student", "Roll No.", "Attended", "Total", "Percentage", "Status"]).map(h => <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" /><span className="font-medium">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{s.roll}</td>
                  {taking ? (
                    <>
                      <td className="px-4 py-3">
                        <button onClick={() => toggle(s.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${present.has(s.id) ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
                          {present.has(s.id) ? <><Check size={11} />Present</> : <><X size={11} />Absent</>}
                        </button>
                      </td>
                      <td className="px-4 py-3"><button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={14} /></button></td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">{Math.round(s.attendance * 45 / 100)}</td>
                      <td className="px-4 py-3 text-muted-foreground">45</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.attendance}%`, background: s.attendance >= 75 ? "#4ade80" : "#f87171" }} /></div>
                          <span className={`text-sm font-medium ${s.attendance >= 75 ? "text-green-400" : "text-red-400"}`}>{s.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {s.attendance >= 85 ? <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Good</span>
                          : s.attendance >= 75 ? <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Average</span>
                            : <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">At Risk</span>}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
