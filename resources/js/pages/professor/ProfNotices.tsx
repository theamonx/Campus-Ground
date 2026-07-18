import { useState } from "react";
import { Send, Star, Edit2, Trash2 } from "lucide-react";
import type { Notice } from "@/types";
import ProfessorLayout from "@/layouts/professor-layout";

const notices: Notice[] = [
  { id: 1, title: "Mid-semester examination schedule released", target: "CS 3rd Year", date: "Nov 12, 2025", pinned: true },
  { id: 2, title: "Lab sessions rescheduled to Friday 2–4 PM", target: "CS-402 Batch A", date: "Nov 10, 2025", pinned: false },
  { id: 3, title: "Guest lecture: System Design at Scale", target: "All departments", date: "Nov 8, 2025", pinned: true },
  { id: 4, title: "Submission portal will be down Nov 14", target: "CS 3rd Year", date: "Nov 7, 2025", pinned: false },
];

export default function ProfNotices() {
  const [noticeList, setNoticeList] = useState(notices);
  const [sel, setSel] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("CS 3rd Year");
  const [pin, setPin] = useState(false);

  const selectedNotice = noticeList.find((notice) => notice.id === sel) ?? null;

  const postNotice = () => {
    if (!title.trim() || !body.trim()) return;

    setNoticeList(current => [{
      id: Date.now(),
      title: title.trim(),
      target,
      date: "Just now",
      pinned: pin,
    }, ...current]);
    setTitle("");
    setBody("");
    setTarget("CS 3rd Year");
    setPin(false);
  };

  const editNotice = (id: number) => {
    const current = noticeList.find((notice) => notice.id === id);
    if (!current) return;

    const nextTitle = window.prompt("Notice title", current.title);
    if (!nextTitle?.trim()) return;
    const nextTarget = window.prompt("Target audience", current.target) ?? current.target;

    setNoticeList(items => items.map((notice) => notice.id === id ? { ...notice, title: nextTitle.trim(), target: nextTarget.trim() || current.target } : notice));
  };

  const deleteNotice = (id: number) => {
    setNoticeList(current => current.filter((notice) => notice.id !== id));
    if (sel === id) {
      setSel(null);
    }
  };

  const togglePinned = (id: number) => {
    setNoticeList(current => current.map((notice) => notice.id === id ? { ...notice, pinned: !notice.pinned } : notice));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Notice Board</h1><p className="text-sm text-muted-foreground">Broadcast announcements to students</p></div>
        <button onClick={postNotice} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Send size={14} />Post Notice</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {noticeList.map(n => (
            <div key={n.id} onClick={() => setSel(sel === n.id ? null : n.id)} className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all ${sel === n.id ? "border-primary/40" : "border-border hover:border-indigo-500/20"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {n.pinned && <Star size={14} className="text-yellow-400 flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{n.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{n.target}</span>
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={(event) => { event.stopPropagation(); togglePinned(n.id); }} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors" title="Pin or unpin"><Star size={13} /></button>
                  <button onClick={(event) => { event.stopPropagation(); editNotice(n.id); }} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"><Edit2 size={13} /></button>
                  <button onClick={(event) => { event.stopPropagation(); deleteNotice(n.id); }} className="p-1.5 text-muted-foreground hover:text-red-400 rounded-lg hover:bg-secondary transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              {sel === n.id && <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed">Sent to <strong className="text-foreground">{n.target}</strong> on {n.date}. Students receive a push notification.{n.pinned && " Currently pinned to the top of the board."}</div>}
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 h-fit">
          <p className="font-semibold text-sm mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Post New Notice</p>
          <div className="flex flex-col gap-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition w-full" placeholder="Notice title..." />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition w-full resize-none h-28" placeholder="Write your announcement..." />
            <select value={target} onChange={(e) => setTarget(e.target.value)} className="bg-secondary rounded-xl px-4 py-3 text-sm outline-none text-muted-foreground w-full">
              <option>CS 3rd Year</option><option>CS-402 Batch A</option><option>All Departments</option>
            </select>
            <div className="flex items-center gap-2 text-sm"><input checked={pin} onChange={(e) => setPin(e.target.checked)} type="checkbox" id="pin" className="accent-primary" /><label htmlFor="pin" className="text-muted-foreground cursor-pointer">Pin to top</label></div>
            <button onClick={postNotice} className="flex items-center justify-center gap-2 bg-primary text-background w-full py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"><Send size={13} />Post Notice</button>
          </div>
        </div>
      </div>
    </div>
  );
}


ProfNotices.layout = (page: React.ReactNode) => <ProfessorLayout children={page} />;
