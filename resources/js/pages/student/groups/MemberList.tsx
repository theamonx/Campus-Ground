import { BadgeCheck, Shield, User } from "lucide-react";
import { GroupMemberProfile } from "../../../types";

type MemberListProps = {
  members: GroupMemberProfile[];
  loading: boolean;
};

function MemberAvatar({ src, alt }: { src?: string | null; alt: string }) {
  if (src) {
    return <img src={src} alt={alt} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />;
  }

  return (
    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0" aria-hidden="true">
      <User size={16} className="text-muted-foreground" />
    </div>
  );
}

export function MemberList({ members, loading }: MemberListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/20 p-3 animate-pulse">
            <div className="w-11 h-11 rounded-full bg-secondary" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-secondary" />
              <div className="h-3 w-2/3 rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!members.length) {
    return <div className="rounded-xl border border-dashed border-border bg-secondary/10 px-4 py-6 text-sm text-muted-foreground">No members to show.</div>;
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const isElevated = member.role === "owner" || member.role === "admin";

        return (
          <div key={member.user.id} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/15 p-3">
            <MemberAvatar src={member.user.avatar} alt={member.user.fullName} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold truncate">{member.user.fullName}</p>
                {member.role === "owner" && <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"><BadgeCheck size={11} />Owner</span>}
                {member.role === "admin" && <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Shield size={11} />Admin</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">@{member.user.username} • {member.user.department} • {member.user.year}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Joined {member.joinedAt}</p>
            </div>
            {!isElevated && <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">Member</span>}
          </div>
        );
      })}
    </div>
  );
}
