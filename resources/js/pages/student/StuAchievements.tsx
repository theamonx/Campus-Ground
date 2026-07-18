import { useState } from "react";
import {
  Plus,
  CheckCircle,
  X,
} from "lucide-react";

import StudentLayout from '@/layouts/student-layout';

export default function StuAchievements() {
  const [tab, setTab] = useState<"mine" | "leaderboard">("mine");

  const [showModal, setShowModal] = useState(false);

  // Format today's date safely to YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isFutureDate = (value: string) => value > getTodayDateString();


  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Google Summer of Code 2025",
      category: "Internship",
      date: "Nov 2025",
      icon: "🌟",
      points: 500,
      verified: true,
    },
    {
      id: 2,
      title: "HackBit 2025 — 2nd Place",
      category: "Hackathon",
      date: "Oct 2025",
      icon: "🏅",
      points: 350,
      verified: true,
    },
    {
      id: 3,
      title: "Published on Medium (10k reads)",
      category: "Writing",
      date: "Sep 2025",
      icon: "✍️",
      points: 200,
      verified: false,
    },
    {
      id: 4,
      title: "AWS Certified Cloud Practitioner",
      category: "Certification",
      date: "Aug 2025",
      icon: "☁️",
      points: 280,
      verified: true,
    },
    {
      id: 5,
      title: "Open Source — 50 PRs Merged",
      category: "Open Source",
      date: "Jul 2025",
      icon: "🔧",
      points: 320,
      verified: false,
    },
  ]);

  const [draft, setDraft] = useState({
    title: "",
    category: "",
    date: "",
    icon: "🏆",
    points: "100",
    verified: false,
  });

  const leaderboard = [
    {
      rank: 1,
      name: "Meera Joshi",
      points: 3420,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
      badge: "🥇",
    },
    {
      rank: 2,
      name: "Ananya Sharma",
      points: 2890,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
      badge: "🥈",
    },
    {
      rank: 3,
      name: "Dev Patel",
      points: 2310,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
      badge: "🥉",
    },
    {
      rank: 4,
      name: "Priya Nair",
      points: 1650,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
      badge: "",
    },
    {
      rank: 5,
      name: "Rohan Mehta",
      points: 1520,
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format",
      badge: "",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h1
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Achievements
          </h1>

          <p className="text-sm text-muted-foreground">
            Your milestones, certifications, and wins
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={15} />
          Add Achievement
        </button>

      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-indigo-500/10 border border-orange-500/20 rounded-2xl p-6 flex items-center justify-between">

        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Your Campus Points
          </p>

          <p
            className="text-4xl font-extrabold"
            style={{
              fontFamily:
                "'Bricolage Grotesque', sans-serif",
            }}
          >
            1,650
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            Rank #4 in your batch · Top 15%
          </p>
        </div>

        <div className="text-6xl">
          🎯
        </div>

      </div>

      <div className="flex gap-2">

        {(["mine", "leaderboard"] as const).map((t) => (

          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${tab === t
              ? "bg-primary text-background font-medium"
              : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
          >
            {t === "mine"
              ? "My Achievements"
              : "Leaderboard"}
          </button>

        ))}

      </div>

      {tab === "mine" ? (
        <div className="flex flex-col gap-3">

          {achievements.map((a) => (

            <div
              key={a.id}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/20 transition"
            >

              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-3xl flex-shrink-0">
                {a.icon}
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2 mb-1">

                  <p className="font-semibold text-sm truncate">
                    {a.title}
                  </p>

                  {a.verified ? (
                    <CheckCircle
                      size={14}
                      className="text-primary flex-shrink-0"
                    />
                  ) : (
                    <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}

                </div>

                <p className="text-xs text-muted-foreground">
                  {a.category} • {a.date}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-accent">
                  +{a.points}
                </p>

                <p className="text-[10px] text-muted-foreground">
                  points
                </p>

              </div>

            </div>

          ))}

        </div>
      ) : (

        <div className="bg-card border border-border rounded-2xl overflow-hidden">

          {leaderboard.map((user) => (

            <div
              key={user.rank}
              className={`flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-0 transition-colors ${user.rank === 4
                ? "bg-primary/5 border-l-2 border-l-primary"
                : "hover:bg-secondary/30"
                }`}
            >

              <div className="w-8 text-center text-lg font-bold">
                {user.badge || `#${user.rank}`}
              </div>

              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">

                <p className="font-semibold">

                  {user.name}

                  {user.rank === 4 && (
                    <span className="ml-2 text-xs text-primary">
                      (You)
                    </span>
                  )}

                </p>

              </div>

              <div className="text-right">

                <p className="font-bold">
                  {user.points.toLocaleString()}
                </p>

                <p className="text-xs text-muted-foreground">
                  pts
                </p>

              </div>

            </div>

          ))}

        </div>

      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-xl font-bold">
                Add Achievement
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setDraft({
                    title: "",
                    category: "",
                    date: "",
                    icon: "🏆",
                    points: "100",
                    verified: false,
                  });
                }}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">

              <input
                type="text"
                placeholder="Achievement Title"
                value={draft.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                type="text"
                placeholder="Category"
                value={draft.category}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                type="date"
                max={getTodayDateString()}
                value={draft.date}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    date: e.target.value,
                  })
                }
                className={`w-full rounded-lg border border-border bg-background p-3 outline ${isFutureDate(draft.date) ? 'outline-red-500' : ''} `}
              />

              <input
                type="number"
                placeholder="Points"
                value={draft.points}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    points: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                type="text"
                placeholder="Emoji (🏆)"
                value={draft.icon}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    icon: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <label className="flex items-center gap-2 text-sm">

                <input
                  type="checkbox"
                  checked={draft.verified}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      verified: e.target.checked,
                    })
                  }
                  className="accent-primary"
                />

                Verified Achievement

              </label>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 p-5 border-t border-border">

              <button
                onClick={() => {
                  setShowModal(false);

                  setDraft({
                    title: "",
                    category: "",
                    date: "",
                    icon: "🏆",
                    points: "100",
                    verified: false,
                  });
                }}
                className="px-5 py-2 rounded-lg border border-border"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (
                    !draft.title.trim() ||
                    !draft.category.trim() ||
                    !draft.date.trim()
                  ) {
                    alert("Please fill all required fields.");
                    return;
                  }

                  if (isFutureDate(draft.date)) {
                    alert("Please choose a date that is today or earlier.");
                    return;
                  }

                  setAchievements((current) => [
                    {
                      id: Date.now(),
                      title: draft.title,
                      category: draft.category,
                      date: draft.date,
                      icon: draft.icon || "🏆",
                      points: Number(draft.points),
                      verified: draft.verified,
                    },
                    ...current,
                  ]);

                  setDraft({
                    title: "",
                    category: "",
                    date: "",
                    icon: "🏆",
                    points: "100",
                    verified: false,
                  });

                  setShowModal(false);
                  setTab("mine");
                }}
                className="px-5 py-2 rounded-lg bg-primary text-background hover:opacity-90 transition"
              >
                Save Achievement
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

StuAchievements.layout = (page: React.ReactNode) => <StudentLayout children={page} />;
