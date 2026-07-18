import { useState } from "react";
import { Plus, Eye, Edit2, Trash2, Clock, Users } from "lucide-react";
import { AssignBadge } from "@/common";
import type { Assignment } from "@/types";

const assignments: Assignment[] = [
  { id: 1, title: "Binary Search Tree Implementation", subject: "Data Structures", due: "Nov 20, 2025", submitted: 38, total: 62, status: "active" },
  { id: 2, title: "ER Diagram for Hospital DB", subject: "DBMS", due: "Nov 18, 2025", submitted: 62, total: 62, status: "closed" },
  { id: 3, title: "Process Scheduling Simulation", subject: "OS", due: "Nov 25, 2025", submitted: 12, total: 62, status: "active" },
  { id: 4, title: "TCP/IP Layer Analysis", subject: "Computer Networks", due: "Dec 2, 2025", submitted: 0, total: 62, status: "draft" },
];

export function ProfAssignments() {
  const [assignmentList, setAssignmentList] = useState(assignments);

  const createAssignment = () => {
    const title = window.prompt("Assignment title");
    if (!title?.trim()) return;

    const subject = window.prompt("Subject", "Data Structures") ?? "Data Structures";
    const due = window.prompt("Due date", "Dec 5, 2025") ?? "Dec 5, 2025";

    setAssignmentList(current => [{
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "Data Structures",
      due: due.trim() || "Dec 5, 2025",
      submitted: 0,
      total: 62,
      status: "draft",
    }, ...current]);
  };

  const updateAssignment = (id: number) => {
    const current = assignmentList.find((assignment) => assignment.id === id);
    if (!current) return;

    const title = window.prompt("Assignment title", current.title);
    if (!title?.trim()) return;

    const subject = window.prompt("Subject", current.subject) ?? current.subject;
    const due = window.prompt("Due date", current.due) ?? current.due;

    setAssignmentList(items => items.map((assignment) => assignment.id === id ? { ...assignment, title: title.trim(), subject: subject.trim() || current.subject, due: due.trim() || current.due } : assignment));
  };

  const deleteAssignment = (id: number) => {
    setAssignmentList(current => current.filter((assignment) => assignment.id !== id));
  };

  const viewAssignment = (assignment: Assignment) => {
    window.alert(`${assignment.title}\n${assignment.subject}\nDue ${assignment.due}\n${assignment.submitted}/${assignment.total} submitted`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Assignments</h1><p className="text-sm text-muted-foreground">Create and manage student assignments</p></div>
        <button onClick={createAssignment} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Plus size={14} />New Assignment</button>
      </div>
      <div className="flex flex-col gap-3">
        {assignmentList.map(a => {
          const pct = Math.round((a.submitted / a.total) * 100);
          return (
            <div key={a.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"><AssignBadge status={a.status} /><span className="text-xs text-muted-foreground">{a.subject}</span></div>
                  <p className="font-semibold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{a.title}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={11} />Due {a.due}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{a.submitted}/{a.total} submitted</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => viewAssignment(a)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"><Eye size={15} /></button>
                  <button onClick={() => updateAssignment(a.id)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => deleteAssignment(a.id)} className="p-2 text-muted-foreground hover:text-red-400 rounded-lg hover:bg-secondary transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{pct}% submitted</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
