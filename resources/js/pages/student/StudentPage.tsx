import { useState } from "react";
import { Sparkles, ChevronRight, Bell, Search, LogOut, ArrowRight, Home, User, Trophy, Swords, Users, Star, Calendar, Megaphone, Eye, EyeOff, Shield } from "lucide-react";
import { StuFeed } from "./StuFeed";
import { StuProfile } from "./StuProfile";
import { StuAchievements } from "./StuAchievements";
import { StuDuels } from "./StuDuels";
import { StuGroups } from "./StuGroups";
import { StuClubs } from "./StuClubs";
import { StuEvents } from "./StuEvents";
import { StuProtests } from "./StuProtests";
import type { Page } from "@/types";

const studentNavItems = [
  { id: "feed", icon: Home, label: "Feed" },
  { id: "profile", icon: User, label: "My Profile" },
  { id: "achievements", icon: Trophy, label: "Achievements" },
  { id: "duels", icon: Swords, label: "Duels", badge: 2 },
  { id: "groups", icon: Users, label: "Groups" },
  { id: "clubs", icon: Star, label: "Clubs" },
  { id: "events", icon: Calendar, label: "Events" },
  { id: "protests", icon: Megaphone, label: "Protests", badge: 1 },
];

type StuViewProps = { anon: boolean };
const stuViews: Record<string, React.FC<StuViewProps>> = {
  feed: StuFeed,
  profile: ({ anon: _ }) => <StuProfile />,
  achievements: ({ anon: _ }) => <StuAchievements />,
  duels: StuDuels,
  groups: ({ anon: _ }) => <StuGroups />,
  clubs: ({ anon: _ }) => <StuClubs />,
  events: ({ anon: _ }) => <StuEvents />,
  protests: StuProtests,
};

export default function StudentPage({ navigate }: { navigate: (p: Page) => void }) {
  const [active, setActive] = useState("feed");
  const [anon, setAnon] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const View = stuViews[active];

  const resolveSearch = () => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    const match = studentNavItems.find(({ id, label }) => `${id} ${label}`.toLowerCase().includes(query));
    if (match) {
      setActive(match.id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <aside className={`flex-shrink-0 ${collapsed ? "w-16" : "w-60"} hidden sm:flex flex-col border-r border-border bg-card transition-all duration-200`}>
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0"><Sparkles size={15} className="text-background" /></div>
          {!collapsed && <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Campus<span className="text-accent">Ground</span></span>}
          <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors" onClick={() => setCollapsed(!collapsed)}><ChevronRight size={14} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} /></button>
        </div>

        {/* Anonymous toggle */}
        {!collapsed ? (
          <div className={`mx-3 mt-3 mb-1 rounded-xl p-3 border transition-all ${anon ? "bg-primary/5 border-primary/20" : "bg-secondary border-border"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium flex items-center gap-1.5">{anon ? <><Shield size={11} className="text-primary" />Anonymous</> : <><Eye size={11} />Visible</>}</span>
              <button onClick={() => setAnon(!anon)} className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${anon ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${anon ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">{anon ? "Your identity is hidden" : "Toggle to post anonymously"}</p>
          </div>
        ) : (
          <button onClick={() => setAnon(!anon)} className={`mx-2 my-3 p-2.5 rounded-xl transition-all ${anon ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`} title="Anonymous Mode">
            {anon ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

        <nav className="flex-1 py-2 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {studentNavItems.map(({ id, icon: Icon, label, badge }) => (
            <button key={id} onClick={() => setActive(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative group ${active === id ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {badge && !collapsed && <span className="ml-auto bg-accent text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
              {badge && collapsed && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />}
              {collapsed && <span className="absolute left-full ml-2 bg-card border border-border text-foreground text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{label}</span>}
            </button>
          ))}
        </nav>
        {!collapsed && (
          <div className="px-3 pb-3">
            <a href="/" className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl hover:bg-secondary transition-colors">
              <ArrowRight size={12} className="rotate-180" />Back to Home
            </a>
          </div>
        )}
        <div className={`border-t border-border p-3 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format" alt="Profile" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          {!collapsed && <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">Priya Nair</p><p className="text-[10px] text-muted-foreground truncate">CS 3rd Year · 1,650 pts</p></div>}
          {!collapsed && <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"><LogOut size={14} /></button>}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center px-6 gap-4 bg-card/50 flex-shrink-0">
          <div className="sm:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center"><Sparkles size={13} className="text-background" /></div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Campus<span className="text-accent">Ground</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight size={13} />
            <span className="text-foreground capitalize">{active}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setAnon(!anon)} className={`sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${anon ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary text-muted-foreground border-border"}`}>
              {anon ? <><Shield size={11} />Anon</> : <><Eye size={11} />Public</>}
            </button>
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2"><Search size={13} className="text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && resolveSearch()} className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-40" placeholder="Search..." /></div>
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors relative"><Bell size={16} /><span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" /></button>
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>
        <div className="sm:hidden flex overflow-x-auto gap-1 px-4 py-2 border-b border-border bg-card/30">
          {studentNavItems.map(({ id, icon: Icon, badge }) => (
            <button key={id} onClick={() => setActive(id)} className={`flex-shrink-0 p-2.5 rounded-xl transition-colors relative ${active === id ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary"}`}>
              <Icon size={16} />
              {badge && <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />}
            </button>
          ))}
        </div>
        <main className="flex-1 overflow-y-auto p-6"><View anon={anon} /></main>
      </div>
    </div>
  );
}
