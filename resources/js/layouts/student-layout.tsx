// resources/js/Layouts/StudentLayout.tsx
import React, { useState } from "react";
import {
  Sparkles, ChevronRight, Bell, Search, LogOut, ArrowRight,
  Home, User, Trophy, Swords, Users, Star, Calendar,
  Megaphone, Eye, EyeOff, Shield
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { StudentProvider, useStudent } from "@/contexts/StudentContext";
import { CampusUser, PageSharedProps } from "@/types"; // Import from your types package
import type { Auth } from '@/types/auth';
import { useAuth } from '@/hooks/use-auth';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const mockStudent: CampusUser = {
  id: 1,
  username: "priyanair",
  studentId: "BTECH/CS/2024/042",
  fullName: "Priya Nair",
  department: "Computer Science",
  year: "3rd Year",
  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format"
};

const studentNavItems = [
  { id: "feed", href: "/student", icon: Home, label: "Feed" },
  { id: "profile", href: "/student/profile", icon: User, label: "My Profile" },
  { id: "achievements", href: "/student/achievements", icon: Trophy, label: "Achievements" },
  { id: "duels", href: "/student/duels", icon: Swords, label: "Duels", badge: 2 },
  { id: "groups", href: "/student/groups", icon: Users, label: "Groups" },
  { id: "clubs", href: "/student/clubs", icon: Star, label: "Clubs" },
  { id: "events", href: "/student/events", icon: Calendar, label: "Events" },
  { id: "protests", href: "/student/protests", icon: Megaphone, label: "Protests", badge: 1 },
];

function LayoutShell({ children }: StudentLayoutProps) {
  const { url } = usePage();
  const isMobile = window.innerWidth < 600;

  // Strongly typed using your custom CampusUser shape from index.ts
  const authUser: CampusUser =  mockStudent;
  // const authUser: CampusUser = props.auth?.user || mockStudent;
  const { user } = useAuth();

 // Use the global state context instead of local useState!
  const { anon, setAnon } = useStudent();

  const [collapsed, setCollapsed] = useState<boolean>(isMobile);
  const [search, setSearch] = useState<string>("");

  const currentTab = studentNavItems.find(item => url == item.href)?.id || "feed";

  const resolveSearch = (): void => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    const match = studentNavItems.find(({ id, label }) =>
      `${id} ${label}`.toLowerCase().includes(query)
    );
    if (match) {
      window.location.href = match.href;
    }
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <aside className={`flex-shrink-0 ${collapsed ? "sm:w-16" : "sm:w-60"} w-full fixed sm:relative z-50 bottom-0 left-0 flex flex-col border-r border-border bg-card transition-all duration-200`}>
        {/* Navigation Branding Shell */}
        <div className="fixed z-50 top-0 left-0 z-50 sm:static flex items-center gap-3 px-4 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Sparkles size={15} className="text-background" />
          </div>
          {!collapsed && (
            <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Campus<span className="text-accent">Ground</span>
            </span>
          )}
          <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors" onClick={() => setCollapsed(!collapsed)}>
            <ChevronRight size={14} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>
        <div class="sm:hidden block w-full h-14 bg-card fixed top-0 left-0 z-40"></div>

        {/* Anonymous Switch Element */}
        {!collapsed ? (
          <div className={` mx-3 mt-3 mb-1 rounded-xl p-3 border transition-all ${anon ? "bg-primary/5 border-primary/20" : "bg-secondary border-border"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium flex items-center gap-1.5">
                {anon ? <><Shield size={11} className="text-primary" />Anonymous</> : <><Eye size={11} />Visible</>}
              </span>
              <button onClick={() => setAnon(!anon)} className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${anon ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${anon ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">{anon ? "Your identity is hidden" : "Toggle to post anonymously"}</p>
          </div>
        ) : (
          <button onClick={() => setAnon(!anon)} className={`fixed right-0 bottom-10 w-fit aspect-square mx-2 my-3 p-2.5 rounded-xl transition-all ${anon ? "bg-purple-500/80 sm:bg-primary/10 text-muted-foreground" : "bg-orange-500 sm:bg-secondary text-primary hover:text-foreground"}`} title="Anonymous Mode">
            {anon ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

        <nav className="flex-1 py-2 flex sm:flex-col gap-0.5 px-2 overflow-y-auto">
          {studentNavItems.map(({ id, href, icon: Icon, label, badge }) => {
            const isActive = url == href;
            return (
              <Link
                key={id}
                href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative group ${isActive ? "bg-accent/10 text-purple-500 font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
                {badge && !collapsed && <span className="ml-auto bg-accent text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
                {badge && collapsed && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* User Workspace Profile Card Segment */}
        <div className={`fixed top-0 right-0 md:static max-w-48 md:max-w-auto  z-50  flex border-t border-border p-3 items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <img src={user.avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format"} alt="Profile" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{authUser.department} · Year {authUser.year}</p>
            </div>
          )}
          {!collapsed && (
            <Link method="post" href="/logout" as="button" className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
              <LogOut size={14} />
            </Link>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center px-6 gap-4 bg-card/50 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-foreground capitalize">{currentTab}</span>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
              <Search size={13} className="text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && resolveSearch()} className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-40" placeholder="Search..." />
            </div>
            <img src={user.avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format"} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-16 relative z-30">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function StudentLayout({ children }: StudentLayoutProps){
    return (
        <StudentProvider>
          <LayoutShell>{children}</LayoutShell>
        </StudentProvider>
    );
}
