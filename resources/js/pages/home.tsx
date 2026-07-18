import { useState } from "react";
import {
  GraduationCap,
  Users,
  Bell,
  Calendar,
  BarChart3,
  ClipboardList,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Zap,
  Layers,
  Globe,
  Shield,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Page } from "@/types";

const landingFeatures = [
  {
    icon: Zap,
    title: "Real-time sync",
    body: "Grades, attendance, and notices update the moment a professor saves.",
  },
  {
    icon: Layers,
    title: "Two systems, one login",
    body: "Academic tools and social features under a single campus identity.",
  },
  {
    icon: Globe,
    title: "Any device",
    body: "Runs perfectly on desktop, tablet, or mobile — no app download needed.",
  },
  {
    icon: Shield,
    title: "Protected identity",
    body: "Anonymous Mode lets students speak freely, with identity only revealed in severe cases.",
  },
];

export default function home({ navigate }: { navigate: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navTargets: Record<string, string> = {
    Features: '#features',
    Academic: '#academic',
    Social: '#social',
    'Anonymous Mode': '#anonymous',
  };

  const academicFeatureList = [
    "Grade & Marks Management",
    "Attendance Tracking",
    "Assignment Distribution",
    "Resources & Notes",
    "Notice Board",
    "Events & Fests",
    "Official Groups",
    "HOD Dashboard",
  ];
  const socialFeatureList = [
    "Achievements & Wins",
    "Duel Challenges",
    "Unofficial Groups",
    "Club Management",
    "Student Events",
    "Protests with Anon Mode",
    "Discussion Boards",
    "Campus Challenges",
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap size={16} className="text-background" />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Campus<span className="text-primary">Ground</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {["Features", "Academic", "Social", "Anonymous Mode"].map((item) => (
              <a
                key={item}
                href={navTargets[item]}
                className="hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="/professor"
              className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors border border-border rounded-lg hover:bg-secondary"
            >
              Professor Login
            </a>
            <a href="/student"
              className="text-sm bg-primary text-background px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Student Login
            </a>
          </div>
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
            {["Features", "Academic", "Social", "Anonymous Mode"].map((item) => (
              <a
                key={item}
                href={navTargets[item]}
                className="text-sm text-muted-foreground py-1"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
             <a href="/professor"
                className="flex-1 text-sm border border-border text-foreground px-4 py-2.5 rounded-lg"
              >
                Professor
              </a>
               <a href="/student"
                className="flex-1 text-sm bg-primary text-background px-4 py-2.5 rounded-lg font-medium"
              >
                Student
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative" id="academic">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
              <GraduationCap size={12} />
              Academic System
            </span>
            <span className="text-muted-foreground text-xs">+</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-orange-500/10 text-orange-300 border-orange-500/20">
              <Users size={12} />
              Student Social
            </span>
          </div>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] font-extrabold mb-6 tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            One Campus.
            <br />
            <span className="text-primary">Two Worlds.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Campus Ground unifies academic management for faculty and a social
            network for students — under one roof, with identity exactly as
            protected as you want it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/student"     className="flex items-center gap-2 bg-primary text-background px-7 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm w-full sm:w-auto justify-center"
            >
              I'm a Student <ArrowRight size={16} />
            </a>
            <a href="/professor"
              className="flex items-center gap-2 bg-secondary border border-border text-foreground px-7 py-4 rounded-xl font-bold hover:bg-card transition-colors text-sm w-full sm:w-auto justify-center"
            >
              I'm a Professor <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 ml-4 bg-muted rounded-md h-6 max-w-xs text-xs text-muted-foreground flex items-center px-3">
                campusground.edu
              </div>
            </div>
            <div className="grid grid-cols-12 min-h-64">
              <div className="col-span-2 border-r border-border p-4 flex flex-col gap-3">
                {[
                  { icon: BarChart3, label: "Grades" },
                  { icon: ClipboardList, label: "Attend." },
                  { icon: Bell, label: "Notices" },
                  { icon: Calendar, label: "Events" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Icon size={14} />
                    <span className="text-[9px]">{label}</span>
                  </div>
                ))}
              </div>
              <div className="col-span-7 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p
                    className="font-bold text-sm"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    CS-402 · Data Structures
                  </p>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    Sem 4
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Attendance", value: "84%", sub: "38/45 classes" },
                    {
                      label: "Avg. Grade",
                      value: "A−",
                      sub: "87.4 / 100",
                    },
                    {
                      label: "Pending",
                      value: "2",
                      sub: "assignments",
                    },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="bg-secondary rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        {label}
                      </p>
                      <p
                        className="font-bold text-lg text-foreground"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
                        {value}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{sub}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary rounded-xl p-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-foreground font-medium">
                      Mid-sem assignment due
                    </span>{" "}
                    · Nov 18 · Uploaded by Prof. Sharma
                  </p>
                </div>
              </div>
              <div className="col-span-3 border-l border-border p-4 flex flex-col gap-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Feed
                </p>
                {[
                  {
                    name: "Ananya R.",
                    text: "Just cleared HackBit 2025! 🏆",
                    time: "2m",
                  },
                  {
                    name: "Anonymous",
                    text: "The canteen situation needs fixing.",
                    time: "14m",
                  },
                  {
                    name: "Dev Club",
                    text: "Winter hackathon registrations open",
                    time: "1h",
                  },
                ].map(({ name, text, time }) => (
                  <div key={time} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-5 h-5 rounded-full flex-shrink-0 ${
                          name === "Anonymous"
                            ? "bg-slate-600"
                            : "bg-indigo-500/30"
                        }`}
                      />
                      <p className="text-[10px] font-medium text-foreground">
                        {name}
                      </p>
                      <p className="text-[9px] text-muted-foreground ml-auto">
                        {time}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground pl-6 leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Live on{" "}
              <span className="text-foreground font-medium">
                3,200+ campuses
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "2", label: "Systems in one platform" },
            { value: "∞", label: "Student voices amplified" },
            { value: "100%", label: "Academic data in sync" },
            { value: "0", label: "Identity exposed by default" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-4xl font-extrabold text-foreground mb-1"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {value}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual cards */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <a
            id="social"
            href="/professor"
            className="cursor-pointer group rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent p-8 sm:p-10 hover:border-indigo-500/40 transition-all hover:-translate-y-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-indigo-500/10 text-indigo-300 border-indigo-500/20 mb-6">
              <GraduationCap size={12} />
              Academic System
            </span>
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Built for the people
              <br />
              who run the campus.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Professors, HODs, and academic coordinators get a structured
              command centre.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {academicFeatureList.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-indigo-300 font-medium group-hover:gap-3 transition-all">
              Open Professor Dashboard <ArrowRight size={14} />
            </p>
          </a>
          <a
          href="/student"
          className="cursor-pointer group rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent p-8 sm:p-10 hover:border-orange-500/40 transition-all hover:-translate-y-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-orange-500/10 text-orange-300 border-orange-500/20 mb-6">
              <Users size={12} />
              Student Social
            </span>
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Built for the voices
              <br />
              that make campus alive.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Students get a full social layer with anonymous mode protecting
              their identity.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {socialFeatureList.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-orange-300 font-medium group-hover:gap-3 transition-all">
              Open Student Hub <ArrowRight size={14} />
            </p>
          </a>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="features">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-12">
          Why Campus Ground
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {landingFeatures.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-0.5 hover:border-indigo-500/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-5">
                <Icon size={18} className="text-primary" />
              </div>
              <p
                className="font-semibold mb-2"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Anonymous spotlight */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="anonymous">
        <div className="rounded-3xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 sm:p-14">
              <div className="flex items-center gap-2 mb-6">
                <Shield size={18} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Anonymous Mode
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Your voice, without
                <br />
                your name attached.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                Students can comment, participate in protests, and raise
                concerns with Anonymous Mode — a profile-level toggle that hides
                identity behind a protected alias.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Identity hidden from all users and moderators",
                  "Alias persists consistently across all posts",
                  "Reveal only on verified court order",
                  "Zero data shared with institutions by default",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary/30 border-l border-border flex items-center justify-center p-10">
              <div className="w-full max-w-sm flex flex-col gap-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <EyeOff size={12} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Anonymous</p>
                      <p className="text-[10px] text-muted-foreground">
                        Identity protected · CS-3rd Year
                      </p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Shield size={8} />
                      Protected
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "The library closing at 8 PM during exam week is genuinely
                    unacceptable. We need 24-hour access or at least 12 AM."
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span>247 signatures</span>
                    <span>38 comments</span>
                    <span className="ml-auto text-primary">Active protest</span>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Shield size={10} className="text-primary" />
                  Try it in the Student Hub
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6" id="contact">
        <div className="max-w-3xl mx-auto text-center">
          <div className="absolute left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight relative"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Ready to bring your
            <br />
            campus online?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Deploy Campus Ground for your institution today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/professor"
              className="flex items-center gap-2 bg-indigo-500 text-white px-7 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm w-full sm:w-auto justify-center"
            >
              Professor Portal <GraduationCap size={16} />
            </a>
            <a
              href="/student"
              className="flex items-center gap-2 bg-orange-500 text-white px-7 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm w-full sm:w-auto justify-center"
            >
              Student Hub <Sparkles size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap size={14} className="text-background" />
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Campus<span className="text-primary">Ground</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            {[
              ["Privacy Policy", "#anonymous"],
              ["Terms of Use", "#features"],
              ["Anonymous Mode Policy", "#anonymous"],
              ["Contact", "#contact"],
            ].map(([item, href]) => (
              <a key={item} href={href} className="hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">support@campusground.edu</p>
          <p className="text-xs text-muted-foreground">© 2025 Campus Ground</p>
        </div>
      </footer>
    </div>
  );
}
