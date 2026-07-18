import { BadgeCheck, Globe, Lock, User, Users } from "lucide-react";
import { CampusGroup } from "../../../types";
import { currentCampusUser } from "../../../services/mockUserService";

type GroupCardProps = {
  group: CampusGroup;
  onAction: (group: CampusGroup) => void;
};

const categoryStyles: Record<string, string> = {
  Academic: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Coding: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Placement: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Sports: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Gaming: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  Music: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Photography: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Fitness: "text-red-400 bg-red-500/10 border-red-500/20",
  Startup: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Clubs: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  Others: "text-muted-foreground bg-muted/10 border-border",
};

function fallbackAvatar(group: CampusGroup) {
  return group.coverImage || "";
}

export function GroupCard({ group, onAction }: GroupCardProps) {
  const privacyIcon = group.privacy === "public" ? <Globe size={11} /> : <Lock size={11} />;
  const hasPendingRequest = group.joinRequests.some((request) => request.userId === currentCampusUser.id);
  const actionLabel = group.joined ? "Open Group" : group.privacy === "private" ? hasPendingRequest ? "Requested" : "Request to Join" : "Join Group";

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-orange-500/20 transition-all flex flex-col">
      <div className="relative h-28 bg-secondary/30">
        {fallbackAvatar(group) ? (
          <img src={fallbackAvatar(group)} alt={group.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-indigo-500/10 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute left-4 bottom-4 flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-2xl bg-background/90 backdrop-blur flex items-center justify-center text-2xl shadow-lg border border-white/20 flex-shrink-0 overflow-hidden">
            {group.icon ? <span>{group.icon}</span> : <User size={20} className="text-muted-foreground" />}
          </div>
          <div className="min-w-0 text-white">
            <p className="text-sm font-semibold truncate">{group.name}</p>
            <div className="flex items-center gap-2 text-[10px] text-white/80 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full border ${categoryStyles[group.category] || categoryStyles.Others}`}>{group.category}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 border border-white/10">{privacyIcon}{group.privacy === "public" ? "Public" : "Private"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-sm truncate">{group.name}</p>
              {group.joined && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Joined</span>}
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{group.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Users size={12} />{group.members.length} members</span>
          <span className="inline-flex items-center gap-1"><BadgeCheck size={12} />By {group.ownerName}</span>
        </div>

        <div className="mt-auto pt-1">
          <button
            onClick={() => onAction(group)}
            className={`w-full text-xs py-2 rounded-lg font-medium transition-all ${group.joined ? "bg-secondary border border-border text-muted-foreground hover:text-foreground" : group.privacy === "private" ? hasPendingRequest ? "bg-secondary border border-border text-muted-foreground" : "bg-primary text-background hover:opacity-90" : "bg-primary text-background hover:opacity-90"}`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
