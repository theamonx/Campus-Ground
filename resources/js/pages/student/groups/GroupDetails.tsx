import { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays, Globe, ImageIcon, Lock, MessageSquare, Sparkles, User, Users, Check, X } from "lucide-react";
import { CampusGroup, GroupJoinRequestProfile, GroupMemberProfile } from "../../../types";
import { MemberList } from "./MemberList";
import { currentCampusUser } from "../../../services/mockUserService";

type GroupDetailsProps = {
  group: CampusGroup | null;
  members: GroupMemberProfile[];
  joinRequests: GroupJoinRequestProfile[];
  loading: boolean;
  onJoinToggle: (group: CampusGroup) => void | Promise<void>;
  onLeave: (groupId: number) => void | Promise<void>;
  onApproveRequest: (userId: number) => void | Promise<void>;
  onRejectRequest: (userId: number) => void | Promise<void>;
};

const tabs = ["Posts", "Members", "Media", "About"] as const;

type TabValue = (typeof tabs)[number];

function GroupAvatar({ group }: { group: CampusGroup }) {
  return (
    <div className="h-16 w-16 rounded-2xl bg-background border border-white/20 shadow-xl flex items-center justify-center text-3xl overflow-hidden">
      {group.icon ? <span>{group.icon}</span> : <User size={24} className="text-muted-foreground" />}
    </div>
  );
}

export function GroupDetails({ group, members, joinRequests, loading, onJoinToggle, onLeave, onApproveRequest, onRejectRequest }: GroupDetailsProps) {
  const [tab, setTab] = useState<TabValue>("Posts");

  useEffect(() => {
    setTab("Posts");
  }, [group?.id]);

  if (!group) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Select a group to open the full community view.
      </div>
    );
  }

  const privacyIcon = group.privacy === "public" ? <Globe size={13} /> : <Lock size={13} />;
  const hasPendingRequest = group.joinRequests.some((request) => request.userId === currentCampusUser.id);
  const canManageRequests = group.ownerId === currentCampusUser.id || members.some((member) => member.user.id === currentCampusUser.id && (member.role === "owner" || member.role === "admin"));
  const actionLabel = group.joined ? "Open Group" : group.privacy === "private" ? hasPendingRequest ? "Requested" : "Request to Join" : "Join Group";

  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="relative h-56 bg-secondary/20">
        {group.coverImage ? (
          <img src={group.coverImage} alt={group.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-orange-500/10 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4">
          <div className="min-w-0 flex items-end gap-4">
            <GroupAvatar group={group} />
            <div className="min-w-0 text-white">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-2xl font-bold truncate" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{group.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${group.privacy === "public" ? "text-white bg-white/10 border-white/20" : "text-white bg-white/10 border-white/20"}`}>{group.category}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 border border-white/10 inline-flex items-center gap-1">{privacyIcon}{group.privacy === "public" ? "Public" : "Private"}</span>
              </div>
              <p className="text-sm text-white/80 mt-1 max-w-2xl line-clamp-2">{group.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {group.joined && group.ownerId !== currentCampusUser.id && (
              <button
                onClick={() => void onLeave(group.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-background/10 text-white border border-white/15 hover:bg-background/20 transition-colors"
              >
                Leave Group
              </button>
            )}
            <button
              onClick={() => void onJoinToggle(group)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${group.joined ? "bg-secondary text-foreground border border-white/10 hover:bg-secondary/80" : group.privacy === "private" ? hasPendingRequest ? "bg-secondary text-foreground border border-white/10" : "bg-primary text-background hover:opacity-90" : "bg-primary text-background hover:opacity-90"}`}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {group.privacy === "private" && hasPendingRequest && !group.joined && (
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-400">
            Your request is pending. The group leader needs to approve it before you can join.
          </div>
        )}

        {canManageRequests && joinRequests.length > 0 && (
          <div className="rounded-2xl border border-border bg-secondary/15 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Join Requests</p>
                <p className="text-xs text-muted-foreground">Approve or reject pending requests for this private group.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{joinRequests.length} pending</span>
            </div>
            <div className="space-y-2">
              {joinRequests.map((request) => (
                <div key={request.user.id} className="rounded-xl border border-border bg-card px-3 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                      {request.user.avatar ? <img src={request.user.avatar} alt={request.user.fullName} className="w-full h-full object-cover" /> : <User size={14} className="text-muted-foreground" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{request.user.fullName}</p>
                      <p className="text-xs text-muted-foreground truncate">@{request.user.username} • {request.user.department} • {request.user.year}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Requested {request.requestedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => void onApproveRequest(request.user.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"><Check size={12} />Approve</button>
                    <button onClick={() => void onRejectRequest(request.user.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"><X size={12} />Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-border bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Created By</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {group.ownerAvatar ? <img src={group.ownerAvatar} alt={group.ownerName} className="w-full h-full object-cover" /> : <User size={14} className="text-muted-foreground" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{group.ownerName}</p>
                <p className="text-[11px] text-muted-foreground">Owner/Admin</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Members</p>
            <p className="mt-2 text-xl font-bold flex items-center gap-2"><Users size={16} />{group.members.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Privacy</p>
            <p className="mt-2 text-sm font-semibold flex items-center gap-2">{privacyIcon}{group.privacy === "public" ? "Public" : "Private"}</p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Created</p>
            <p className="mt-2 text-sm font-semibold flex items-center gap-2"><CalendarDays size={14} />{group.createdAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-auto pb-1">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${tab === item ? "border-primary/40 bg-primary/10 text-primary" : "border-border hover:bg-secondary/60"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="min-h-[280px]">
          {tab === "Posts" && (
            <div className="space-y-4">
              {group.posts.length ? group.posts.map((post) => (
                <article key={post.id} className="rounded-2xl border border-border bg-secondary/15 p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                      {post.authorAvatar ? <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" /> : <User size={16} className="text-muted-foreground" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{post.authorName}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{post.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{post.content}</p>
                      {post.media && <img src={post.media} alt="Post media" className="mt-3 rounded-xl border border-border w-full max-h-72 object-cover" />}
                    </div>
                  </div>
                </article>
              )) : (
                <div className="rounded-2xl border border-dashed border-border bg-secondary/10 p-6 text-center text-sm text-muted-foreground">
                  No posts yet. Be the first to start the conversation.
                </div>
              )}
            </div>
          )}

          {tab === "Members" && <MemberList members={members} loading={loading} />}

          {tab === "Media" && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {group.media.length ? group.media.map((item) => (
                <figure key={item.id} className="rounded-2xl overflow-hidden border border-border bg-secondary/15">
                  <img src={item.src} alt={item.title} className="h-40 w-full object-cover" />
                  <figcaption className="p-3 text-xs font-medium flex items-center gap-2 text-muted-foreground"><ImageIcon size={13} />{item.title}</figcaption>
                </figure>
              )) : (
                <div className="col-span-full rounded-2xl border border-dashed border-border bg-secondary/10 p-6 text-sm text-muted-foreground">No media uploaded yet.</div>
              )}
            </div>
          )}

          {tab === "About" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/15 p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Description</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{group.description}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/15 p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full border border-border bg-background text-muted-foreground">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/15 p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Community Snapshot</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles size={14} />
                  {group.joined ? "You're already part of this group." : "Join to unlock posts, media, and member updates."}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/15 p-4">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Status</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare size={14} />
                  Active campus community
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
