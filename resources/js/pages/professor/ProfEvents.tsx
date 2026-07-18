import { useState } from "react";
import { Plus, Calendar, MapPin, Eye, Edit2 } from "lucide-react";
import type { Event } from "@/types";

const profEvents: Event[] = [
  { id: 1, title: "TechFest 2025 — Annual Tech Festival", date: "Dec 10–12, 2025", venue: "Main Auditorium", registered: 840, capacity: 1200 },
  { id: 2, title: "Industry Connect: Google Campus Visit", date: "Nov 28, 2025", venue: "Seminar Hall B", registered: 60, capacity: 60 },
  { id: 3, title: "Hackathon Prelims — Round 1", date: "Nov 22, 2025", venue: "Lab Block 3", registered: 124, capacity: 200 },
];

export function ProfEvents() {
  const [eventList, setEventList] = useState(profEvents);

  const createEvent = () => {
    const title = window.prompt("Event title");
    if (!title?.trim()) return;

    const date = window.prompt("Event date", "Dec 10, 2025") ?? "Dec 10, 2025";
    const venue = window.prompt("Venue", "Main Auditorium") ?? "Main Auditorium";

    setEventList(current => [{
      id: Date.now(),
      title: title.trim(),
      date: date.trim() || "Dec 10, 2025",
      venue: venue.trim() || "Main Auditorium",
      registered: 0,
      capacity: 100,
    }, ...current]);
  };

  const viewEvent = (event: Event) => {
    window.alert(`${event.title}\n${event.date}\n${event.venue}\n${event.registered}/${event.capacity} registered`);
  };

  const editEvent = (id: number) => {
    const current = eventList.find((event) => event.id === id);
    if (!current) return;

    const title = window.prompt("Event title", current.title);
    if (!title?.trim()) return;

    const date = window.prompt("Event date", current.date) ?? current.date;
    const venue = window.prompt("Venue", current.venue) ?? current.venue;

    setEventList(items => items.map((event) => event.id === id ? { ...event, title: title.trim(), date: date.trim() || current.date, venue: venue.trim() || current.venue } : event));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Events</h1><p className="text-sm text-muted-foreground">Fests, guest lectures, and campus events</p></div>
        <button onClick={createEvent} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Plus size={14} />Create Event</button>
      </div>
      <div className="flex flex-col gap-4">
        {eventList.map(e => {
          const pct = Math.round((e.registered / e.capacity) * 100);
          const full = e.registered >= e.capacity;
          return (
            <div key={e.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2 flex-shrink-0 bg-gradient-to-b from-indigo-500 to-indigo-700" />
                <div className="flex-1 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <p className="font-bold mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{e.title}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={11} />{e.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} />{e.venue}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => viewEvent(e)} className="flex items-center gap-1.5 text-xs bg-secondary border border-border px-3 py-1.5 rounded-lg hover:bg-card transition-colors"><Eye size={12} />View</button>
                      <button onClick={() => editEvent(e.id)} className="flex items-center gap-1.5 text-xs bg-secondary border border-border px-3 py-1.5 rounded-lg hover:bg-card transition-colors"><Edit2 size={12} />Edit</button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: full ? "#f87171" : "#818cf8" }} /></div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{e.registered}/{e.capacity} registered</span>
                    {full && <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">Full</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
