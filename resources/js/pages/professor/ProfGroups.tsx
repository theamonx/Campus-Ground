import { Plus, Users, Settings } from "lucide-react";

export function ProfGroups() {
  const groups = [
    { name: "CS 2025 — Batch A", members: 62, type: "Batch", active: true, avatar: "🎓" },
    { name: "CS-402: Data Structures", members: 62, type: "Subject", active: true, avatar: "📊" },
    { name: "CS-403: DBMS", members: 58, type: "Subject", active: true, avatar: "🗃" },
    { name: "CS-404: Operating Systems", members: 60, type: "Subject", active: false, avatar: "💻" },
    { name: "Project Group — Team Alpha", members: 6, type: "Project", active: true, avatar: "🚀" },
    { name: "Lab Section B", members: 30, type: "Lab", active: true, avatar: "🔬" },
  ];
  const createGroup = () => {
    const name = window.prompt("Group name");
    if (!name?.trim()) return;

    window.alert(`Created group: ${name.trim()}`);
  };

  const openGroup = (name: string) => {
    window.alert(`Opening ${name}.`);
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Official Groups</h1><p className="text-sm text-muted-foreground">Manage your course and batch groups</p></div>
        <button onClick={createGroup} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Plus size={14} />Create Group</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(g => (
          <div key={g.name} className="bg-card border border-border rounded-2xl p-5 hover:border-indigo-500/20 hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">{g.avatar}</div>
              <div className="flex items-center gap-1"><div className={`w-2 h-2 rounded-full ${g.active ? "bg-green-400" : "bg-muted-foreground"}`} /><span className="text-xs text-muted-foreground">{g.active ? "Active" : "Inactive"}</span></div>
            </div>
            <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{g.name}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users size={11} />{g.members} members</div>
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full">{g.type}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => openGroup(g.name)} className="flex-1 text-xs bg-secondary border border-border py-2 rounded-lg hover:bg-primary hover:text-background hover:border-transparent transition-all">Open</button>
              <button className="p-2 text-muted-foreground hover:text-foreground bg-secondary border border-border rounded-lg hover:bg-card transition-colors"><Settings size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
