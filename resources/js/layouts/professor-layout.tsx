import { useState } from "react";
import { GraduationCap, ChevronRight, Bell, Search, LogOut, ArrowRight, LayoutDashboard, BarChart3, ClipboardList, FileText, Folder, Calendar, Users } from "lucide-react";

import { Link, usePage } from "@inertiajs/react";
import type { Page } from "@/types";

interface ProfessorLayoutProps {
  children: React.ReactNode;
}

const profNavItems = [
  { id: "dashboard", href: "/professor", icon: LayoutDashboard, label: "Dashboard" },
  { id: "grades", href: "/professor/grades", icon: BarChart3, label: "Grades & Marks" },
  { id: "attendance", href: "/professor/attendance", icon: ClipboardList, label: "Attendance" },
  { id: "assignments", href: "/professor/assignments", icon: FileText, label: "Assignments", badge: 3 },
  { id: "resources", href: "/professor/resources", icon: Folder, label: "Resources" },
  { id: "notices", href: "/professor/notices", icon: Bell, label: "Notice Board" },
  { id: "events", href: "/professor/events", icon: Calendar, label: "Events" },
  { id: "groups", href: "/professor/groups", icon: Users, label: "Official Groups" },
];

export default function ProfessorPage({ children }: ProfessorLayoutProps) {
  const { url } = usePage();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const currentTab = profNavItems.find(item => url == item.href)?.id || "dashboard";


  const resolveSearch = (): void => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    const match = profNavItems.find(({ id, label }) =>
      `${id} ${label}`.toLowerCase().includes(query)
    );
    if (match) {
      window.location.href = match.href;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <aside className={`flex-shrink-0 ${collapsed ? "w-16" : "w-60"} hidden sm:flex flex-col border-r border-border bg-card transition-all duration-200`}>
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0"><GraduationCap size={16} className="text-background" /></div>
          {!collapsed && <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Campus<span className="text-primary">Ground</span></span>}
          <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors" onClick={() => setCollapsed(!collapsed)}><ChevronRight size={14} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} /></button>
        </div>
        <nav className="flex-1 py-2 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {profNavItems.map(({ id, href, icon: Icon, label, badge }) => {
            const isActive = url == href;
            return (
              <Link
                key={id}
                href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative group ${isActive ? "bg-accent/10 text-accent font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
                {badge && !collapsed && <span className="ml-auto bg-accent text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
                {badge && collapsed && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="px-3 pb-3">
            <a href="/" className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl hover:bg-secondary transition-colors">
              <ArrowRight size={12} className="rotate-180" />Back to Home
            </a>
          </div>
        )}
        <div className={`border-t border-border p-3 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&auto=format" alt="Prof." className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          {!collapsed && <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">Prof. Rajiv Sharma</p><p className="text-[10px] text-muted-foreground truncate">CS Dept · HOD</p></div>}
          {!collapsed && <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"><LogOut size={14} /></button>}
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center px-6 gap-4 bg-card/50 flex-shrink-0">
          <div className="sm:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center"><GraduationCap size={14} className="text-background" /></div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Campus<span className="text-primary">Ground</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight size={13} />
            <span className="text-foreground capitalize">{currentTab}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
              <Search size={13} className="text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && resolveSearch()} className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-40" placeholder="Search..." />
            </div>            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&auto=format" alt="Prof." className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>
        <div className="sm:hidden flex overflow-x-auto gap-1 px-4 py-2 border-b border-border bg-card/30">
          {profNavItems.map(({ id, icon: Icon, href, badge }) => (
            <a key={id} href={href} className={`flex-shrink-0 p-2.5 rounded-xl transition-colors relative ${currentTab === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
              <Icon size={16} />
              {badge && <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />}
            </a>
          ))}
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
