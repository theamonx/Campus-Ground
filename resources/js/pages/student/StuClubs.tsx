import { useState } from "react";
import { Settings } from "lucide-react";
import type { Club } from "@/types";

const clubs: Club[] = [
  { id: 1, name: "Dev Club", emoji: "💻", members: 320, category: "Tech", joined: true, desc: "Coding, hackathons, and open source." },
  { id: 2, name: "Photography Society", emoji: "📷", members: 145, category: "Creative", joined: true, desc: "Weekly photowalks, workshops, and exhibitions." },
  { id: 3, name: "Robotics Club", emoji: "🤖", members: 88, category: "Tech", joined: false, desc: "Build bots, compete nationally." },
  { id: 4, name: "Debating Society", emoji: "🎙", members: 210, category: "Culture", joined: false, desc: "Motion-based debates, national competitions." },
  { id: 5, name: "E-Cell", emoji: "🚀", members: 190, category: "Business", joined: true, desc: "Startup culture, pitch nights, VC connects." },
  { id: 6, name: "Music Club", emoji: "🎵", members: 160, category: "Arts", joined: false, desc: "Jam sessions, inter-college fests, studios." },
];

export function StuClubs() {
  const [clubList, setClubList] = useState(clubs);
  const toggle = (id: number) => setClubList(c => c.map(x => x.id === id ? { ...x, joined: !x.joined } : x));
  const cats = ["All", "Tech", "Creative", "Culture", "Business", "Arts"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? clubList : clubList.filter(c => c.category === cat);
  const manageClubs = () => {
    window.alert("Open a club to manage membership, notifications, and pinned discussions.");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Clubs</h1><p className="text-sm text-muted-foreground">Official student clubs and organisations</p></div>
        <button onClick={manageClubs} className="flex items-center gap-2 bg-secondary border border-border text-foreground px-4 py-2 rounded-lg text-sm hover:bg-card transition-colors"><Settings size={14} />Manage My Clubs</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">{cats.map(c => <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${cat === c ? "bg-primary text-background font-medium" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{c}</button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-orange-500/20 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">{c.emoji}</div><div><p className="font-semibold text-sm">{c.name}</p><div className="flex items-center gap-2 mt-0.5"><span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">{c.category}</span><span className="text-xs text-muted-foreground">{c.members} members</span></div></div></div>
              {c.joined && <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Joined</span>}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            <button onClick={() => toggle(c.id)} className={`w-full text-xs py-2.5 rounded-xl font-medium transition-all ${c.joined ? "bg-secondary border border-border text-muted-foreground hover:text-red-400 hover:border-red-500/20" : "bg-primary text-background hover:opacity-90"}`}>{c.joined ? "Leave Club" : "Join Club"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
