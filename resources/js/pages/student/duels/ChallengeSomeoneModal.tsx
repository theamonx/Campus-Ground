import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Clock3, Search, Sparkles, User, X } from "lucide-react";
import { CampusUser } from "../../../types";

type ChallengeSomeoneModalProps = {
  open: boolean;
  onClose: () => void;
  usersLoading: boolean;
  filteredUsers: CampusUser[];
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  selectedUser: CampusUser | null;
  onSelectUser: (user: CampusUser) => void;
  topic: string;
  onTopicChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  submitting: boolean;
  onSubmit: () => void | Promise<boolean>;
};

const categories = ["Coding", "Quiz", "Debate", "Creative"];

function UserAvatar({ user, size = "w-11 h-11" }: { user?: CampusUser | null; size?: string }) {
  const avatar = user?.avatar ?? "";

  if (avatar) {
    return <img src={avatar} alt={user?.fullName ?? "User avatar"} className={`${size} rounded-full object-cover flex-shrink-0`} />;
  }

  return (
    <div className={`${size} rounded-full bg-secondary flex items-center justify-center flex-shrink-0`} aria-hidden="true">
      <User size={16} className="text-muted-foreground" />
    </div>
  );
}

export function ChallengeSomeoneModal({
  open,
  onClose,
  usersLoading,
  filteredUsers,
  searchValue,
  onSearchValueChange,
  selectedUser,
  onSelectUser,
  topic,
  onTopicChange,
  category,
  onCategoryChange,
  submitting,
  onSubmit,
}: ChallengeSomeoneModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleUsers = useMemo(() => filteredUsers.slice(0, 8), [filteredUsers]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setIsListOpen(false);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchValue, usersLoading, visibleUsers.length]);

  if (!open) {
    return null;
  }

  const chooseUser = (user: CampusUser) => {
    onSelectUser(user);
    setIsListOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isListOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsListOpen(true);
    }

    if (!visibleUsers.length) {
      if (event.key === "Escape") {
        setIsListOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % visibleUsers.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + visibleUsers.length) % visibleUsers.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = visibleUsers[activeIndex];
      if (selected) {
        chooseUser(selected);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsListOpen(false);
    }
  };

  const hasResults = visibleUsers.length > 0;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Challenge Someone
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Search campus users by username, student ID, or name.</p>
          </div>

          <button onClick={onClose} className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary/60 transition-colors" aria-label="Close challenge dialog">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-2 relative">
            <label className="text-xs font-medium text-muted-foreground">Search Student</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={inputRef}
                value={searchValue}
                onChange={(event) => {
                  onSearchValueChange(event.target.value);
                  setIsListOpen(true);
                }}
                onFocus={() => setIsListOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search username, student ID, or full name"
                role="combobox"
                aria-expanded={isListOpen}
                aria-autocomplete="list"
                aria-controls="challenge-user-list"
                className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-sm outline-none focus:border-primary/50"
              />
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            {isListOpen && (
              <div className="absolute z-20 mt-2 w-full rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                <div id="challenge-user-list" role="listbox" className="max-h-72 overflow-auto">
                  {usersLoading ? (
                    <div className="space-y-3 p-4">
                      {[1, 2, 3].map((skeleton) => (
                        <div key={skeleton} className="flex items-center gap-3 animate-pulse">
                          <div className="w-11 h-11 rounded-full bg-secondary" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-2/5 rounded bg-secondary" />
                            <div className="h-3 w-3/5 rounded bg-secondary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : hasResults ? (
                    visibleUsers.map((user, index) => {
                      const isActive = index === activeIndex;
                      const isSelected = selectedUser?.id === user.id;

                      return (
                        <button
                          key={user.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => chooseUser(user)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full text-left px-4 py-3 border-b border-border/60 last:border-b-0 transition-colors ${isActive ? "bg-secondary/60" : "hover:bg-secondary/40"}`}
                        >
                          <div className="flex items-center gap-3">
                            <UserAvatar user={user} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <p className="font-semibold text-sm truncate">{user.fullName}</p>
                                {isSelected && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Selected</span>}
                              </div>
                              <p className="text-xs text-muted-foreground truncate">@{user.username} • {user.studentId}</p>
                              <p className="text-[11px] text-muted-foreground mt-1 truncate">{user.department} • {user.year}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto mb-3 h-11 w-11 rounded-full bg-secondary flex items-center justify-center">
                        <Sparkles size={16} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">No matching users</p>
                      <p className="text-xs text-muted-foreground mt-1">Try a username, student ID, or full name.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedUser ? (
            <div className="rounded-2xl border border-border bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <UserAvatar user={selectedUser} size="w-14 h-14" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{selectedUser.fullName}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Opponent Selected</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">@{selectedUser.username} • {selectedUser.studentId}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedUser.department} • {selectedUser.year}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/10 px-4 py-5 text-sm text-muted-foreground flex items-center gap-3">
              <Clock3 size={16} />
              Select a student to automatically populate the opponent details.
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Challenge Topic</label>
            <input
              value={topic}
              onChange={(event) => onTopicChange(event.target.value)}
              placeholder="e.g. LeetCode two-pointer showdown"
              className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onCategoryChange(item)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${category === item ? "border-primary/40 bg-primary/10 text-primary" : "border-border hover:bg-secondary/50"}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {category === item && <Check size={14} />}
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-border bg-secondary/10">
          <button onClick={onClose} className="px-5 py-2 border border-border rounded-xl text-sm font-medium hover:bg-secondary/60 transition-colors">
            Cancel
          </button>

          <button
            onClick={() => void onSubmit()}
            disabled={!selectedUser || !topic.trim() || submitting}
            className="px-5 py-2 rounded-xl bg-primary text-background text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {submitting ? "Creating..." : "Create Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}
