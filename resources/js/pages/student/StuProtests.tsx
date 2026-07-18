import { useRef, useState } from "react";
import { Megaphone, Shield, Eye, User, ThumbsUp, MessageCircle, Flag, Send } from "lucide-react";
import { AnonAvatar, ProtestStatus } from "@/common";
import type { Protest } from "@/types";
import StudentLayout from '@/layouts/student-layout';
import { useStudent } from '@/contexts/StudentContext';

const protests: Protest[] = [
  { id: 1, title: "24-hour library access during exam week", support: 847, comments: 134, status: "escalated", anon: false, time: "2 days ago", body: "The library consistently closes at 8 PM even during finals week. Students from hostels have no quiet study space after that. We are requesting the administration to extend hours to at least midnight, or ideally 24 hours, from 3 days before exams." },
  { id: 2, title: "Canteen food quality and hygiene standards", support: 412, comments: 89, status: "active", anon: true, time: "4 days ago", body: "Multiple students have reported digestive issues after meals at Canteen 2. The hygiene inspection was last done 8 months ago. We are demanding an immediate third-party inspection and a visible hygiene certificate." },
  { id: 3, title: "Fix the broken ACs in Lab Block 3", support: 203, comments: 41, status: "resolved", anon: false, time: "1 week ago", body: "Lab Block 3 AC units have been broken for 6 weeks during summer. This was reported to maintenance on Nov 1 with no response." },
];

export default function StuProtests() {
  const { anon } = useStudent();
  const [protestList, setProtestList] = useState(protests);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [comment, setComment] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const formRef = useRef<HTMLDivElement | null>(null);
  const support = (id: number) => setProtestList(p => p.map(x => x.id === id ? { ...x, support: x.support + 1 } : x));

  const submitComment = (id: number) => {
    if (!comment.trim()) return;

    setProtestList(current => current.map(protest => protest.id === id ? { ...protest, comments: protest.comments + 1 } : protest));
    setComment("");
  };

  const submitProtest = () => {
    if (!newTitle.trim() || !newBody.trim()) return;

    setProtestList(current => [
      {
        id: Date.now(),
        title: newTitle.trim(),
        support: 0,
        comments: 0,
        status: "active",
        anon,
        time: "Just now",
        body: newBody.trim(),
      },
      ...current,
    ]);
    setExpanded(null);
    setNewTitle("");
    setNewBody("");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Protests</h1><p className="text-sm text-muted-foreground">Raise campus concerns — with or without your name</p></div>
        <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Megaphone size={14} />Start Protest</button>
      </div>
      <div className={`rounded-2xl border p-4 flex items-center gap-3 transition-all ${anon ? "bg-primary/5 border-primary/20" : "bg-secondary border-border"}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${anon ? "bg-primary/20" : "bg-muted"}`}>{anon ? <Shield size={18} className="text-primary" /> : <Eye size={18} className="text-muted-foreground" />}</div>
        <div className="flex-1"><p className="text-sm font-medium">{anon ? "Anonymous Mode is ON" : "You are posting as yourself"}</p><p className="text-xs text-muted-foreground">{anon ? "Your identity is protected. Toggle off in the sidebar." : "Toggle Anonymous Mode in the sidebar to hide your identity."}</p></div>
      </div>
      <div className="flex flex-col gap-3">
        {protestList.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1"><ProtestStatus status={p.status} />{p.anon && <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full border border-primary/20"><Shield size={8} />Anonymous</span>}</div>
                  <p className="font-bold text-sm leading-snug cursor-pointer hover:text-primary transition-colors" onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.time}</p>
                </div>
              </div>
              {expanded === p.id && <div className="mb-4"><p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-3">{p.body}</p></div>}
              <div className="flex items-center gap-3">
                <button onClick={() => support(p.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors font-medium"><ThumbsUp size={12} />{p.support} supporters</button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><MessageCircle size={12} />{p.comments}</button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Flag size={12} />Report</button>
                <button className="ml-auto text-xs text-muted-foreground hover:text-foreground hover:bg-secondary px-2 py-2 rounded-lg transition-colors" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>{expanded === p.id ? "Show less" : "Read more"}</button>
              </div>
              {expanded === p.id && p.status === "active" && (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  {anon ? <AnonAvatar /> : <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format" alt="You" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />}
                  <input value={comment} onChange={e => setComment(e.target.value)} placeholder={anon ? "Comment anonymously…" : "Add your voice…"} className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition" />
                  <button onClick={() => submitComment(p.id)} className="p-2 bg-primary text-background rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"><Send size={13} /></button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div ref={formRef} className="bg-card border border-border rounded-2xl p-5">
        <p className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}><Megaphone size={15} className="text-accent" />Start a New Protest</p>
        <div className="flex flex-col gap-3">
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="What needs to change?" className="bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition" />
          <textarea value={newBody} onChange={e => setNewBody(e.target.value)} placeholder="Describe the issue in detail. The more specific, the harder to ignore." className="bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition resize-none h-24" />
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{anon ? <span className="flex items-center gap-1 text-primary"><Shield size={11} />Posting anonymously</span> : <span className="flex items-center gap-1"><User size={11} />Posting as Priya Nair</span>}</div>
            <button onClick={submitProtest} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Megaphone size={13} />Post Protest</button>
          </div>
        </div>
      </div>
    </div>
  );
}


StuProtests.layout = (page: React.ReactNode) => <StudentLayout children={page} />;
