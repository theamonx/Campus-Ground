import { Post } from "../../types";

export function TypePill({ type }: { type: Post["type"] }) {
  const map = {
    achievement: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    post: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    duel: "bg-red-500/10 text-red-400 border-red-500/20",
    protest: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    event: "bg-green-500/10 text-green-400 border-green-500/20",
  }[type];

  const labels = {
    achievement: "🏆 Achievement",
    post: "Post",
    duel: "⚔️ Duel",
    protest: "📢 Protest",
    event: "📅 Event",
  };

  return (
    <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-full ${map}`}>
      {labels[type]}
    </span>
  );
}
