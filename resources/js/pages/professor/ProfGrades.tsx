import { useMemo, useState } from "react";
import { Download, Plus, Search, Filter, Edit2 } from "lucide-react";
import type { Student } from "@/types";
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

export default function ProfGrades() {
  const [subject, setSubject] = useState("Data Structures");
  const [studentsList, setStudentsList] = useState(students);
  const [query, setQuery] = useState("");
  const subjects = ["Data Structures", "DBMS", "Operating Systems", "Computer Networks"];

  const visibleStudents = useMemo(
    () => studentsList.filter((student) => {
      const haystack = `${student.name} ${student.roll} ${student.grade}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    }),
    [query, studentsList]
  );

  const exportCsv = () => {
    const rows = [
      ["Student", "Roll No.", "Attendance", "Grade", "GPA"],
      ...visibleStudents.map((student) => [student.name, student.roll, `${student.attendance}`, student.grade, `${student.gpa}`]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${subject.replaceAll(" ", "-").toLowerCase()}-grades.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const addMarks = () => {
    const name = window.prompt("Student name");
    if (!name?.trim()) return;

    const roll = window.prompt("Roll number") ?? `CS${Date.now().toString().slice(-4)}`;
    const attendance = Number(window.prompt("Attendance percentage", "80") ?? "80");
    const grade = window.prompt("Grade", "A") ?? "A";
    const gpa = Number(window.prompt("GPA", "8.0") ?? "8.0");

    setStudentsList(current => [{
      id: Date.now(),
      name: name.trim(),
      roll: roll.trim() || `CS${Date.now().toString().slice(-4)}`,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
      attendance: Number.isFinite(attendance) ? attendance : 80,
      grade: grade.trim() || "A",
      gpa: Number.isFinite(gpa) ? gpa : 8.0,
    }, ...current]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Grades & Marks</h1><p className="text-sm text-muted-foreground mt-1">Manage and publish student grades</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCsv} className="flex items-center gap-2 bg-secondary border border-border text-foreground px-4 py-2 rounded-lg text-sm hover:bg-card transition-colors"><Download size={14} />Export</button>
          <button onClick={addMarks} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Plus size={14} />Add Marks</button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {subjects.map(s => (
          <button key={s} onClick={() => setSubject(s)} className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${subject === s ? "bg-primary text-background font-medium" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{s}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{ grade: "A+/A", count: 18, color: "text-green-400", bg: "bg-green-500/10" }, { grade: "B+/B", count: 24, color: "text-blue-400", bg: "bg-blue-500/10" }, { grade: "C+/C", count: 12, color: "text-yellow-400", bg: "bg-yellow-500/10" }, { grade: "D/F", count: 8, color: "text-red-400", bg: "bg-red-500/10" }].map(({ grade, count, color, bg }) => (
          <div key={grade} className={`rounded-xl p-4 border border-border ${bg}`}>
            <p className={`text-2xl font-bold ${color}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{count}</p>
            <p className="text-xs text-muted-foreground mt-1">{grade}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 flex-1 max-w-xs"><Search size={14} className="text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1" placeholder="Search student..." /></div>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary px-3 py-2 rounded-lg hover:text-foreground transition-colors"><Filter size={13} />Filter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">{["Student", "Roll No.", "Mid-sem", "End-sem", "Assignment", "Total", "Grade", ""].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {visibleStudents.map((s, i) => {
                const mid = [42, 38, 35, 28, 40, 22, 45, 33][i];
                const end = [48, 44, 39, 30, 42, 25, 50, 38][i];
                const asgn = [9, 8, 7, 6, 8, 5, 10, 7][i];
                const total = mid + end + asgn;
                const gc = s.grade.startsWith("A") ? "text-green-400" : s.grade.startsWith("B") ? "text-blue-400" : s.grade.startsWith("C") ? "text-yellow-400" : "text-red-400";
                return (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3"><div className="flex items-center gap-2.5"><img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" /><span className="font-medium whitespace-nowrap">{s.name}</span></div></td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{s.roll}</td>
                    <td className="px-4 py-3">{mid}<span className="text-muted-foreground text-xs">/50</span></td>
                    <td className="px-4 py-3">{end}<span className="text-muted-foreground text-xs">/50</span></td>
                    <td className="px-4 py-3">{asgn}<span className="text-muted-foreground text-xs">/10</span></td>
                    <td className="px-4 py-3 font-semibold">{total}</td>
                    <td className="px-4 py-3"><span className={`font-bold ${gc}`}>{s.grade}</span></td>
                    <td className="px-4 py-3"><button className="text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={14} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


ProfGrades.layout = (page: React.ReactNode) => <ProfessorLayout children={page} />;
