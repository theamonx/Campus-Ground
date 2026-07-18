import { Plus, Search, Sparkles, Users } from "lucide-react";
import { GroupCard } from "./groups/GroupCard";
import { GroupDetails } from "./groups/GroupDetails";
import { GroupModal } from "./groups/GroupModal";
import { useStuGroupsWorkflow } from "@/hooks/useStuGroupsWorkflow";

export function StuGroups() {
  const {
    groupsLoading,
    selectedGroup,
    groupMembers,
    joinRequests,
    membersLoading,
    filteredGroups,
    recommendedGroups,
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    filterOptions,
    joinOrOpenGroup,
    leaveCurrentGroup,
    approveRequest,
    rejectRequest,
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
    createForm,
    updateCreateForm,
    createError,
    creating,
    submitCreateGroup,
    coverPreview,
    setCoverPreview,
    categories,
  } = useStuGroupsWorkflow();

  const filterChips = filterOptions;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Groups</h1>
          <p className="text-sm text-muted-foreground">Campus communities with real member lists, privacy, and group pages.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={14} />
          Create Group
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1"
            placeholder="Search by group name, description, category, owner, or tags..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-auto pb-1">
          {filterChips.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter ? "border-primary/40 bg-primary/10 text-primary" : "border-border hover:bg-secondary/60"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Recommended For You</p>
            <h2 className="text-lg font-semibold mt-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Suggested campus communities</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles size={14} />
            Based on mock interests and current joins
          </div>
        </div>

        {groupsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-secondary/20 p-4 space-y-3">
                <div className="h-24 rounded-xl bg-secondary" />
                <div className="h-4 w-2/3 rounded bg-secondary" />
                <div className="h-3 w-1/2 rounded bg-secondary" />
              </div>
            ))}
          </div>
        ) : recommendedGroups.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => void joinOrOpenGroup(group)}
                className="text-left rounded-2xl border border-border bg-secondary/15 hover:bg-secondary/30 transition-colors overflow-hidden"
              >
                <div className="h-24 bg-secondary/30">
                  {group.coverImage ? <img src={group.coverImage} alt={group.name} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm truncate">{group.name}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">{group.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{group.description}</p>
                  <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1"><Users size={12} />{group.members.length} members</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/10 px-4 py-6 text-sm text-muted-foreground">
            No recommended groups right now. Explore the full list below.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {groupsLoading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-4 animate-pulse space-y-4">
              <div className="h-28 rounded-xl bg-secondary" />
              <div className="h-4 w-2/3 rounded bg-secondary" />
              <div className="h-3 w-4/5 rounded bg-secondary" />
              <div className="h-3 w-1/2 rounded bg-secondary" />
              <div className="flex gap-2">
                <div className="h-8 flex-1 rounded-lg bg-secondary" />
                <div className="h-8 flex-1 rounded-lg bg-secondary" />
              </div>
            </div>
          ))
        ) : filteredGroups.length ? (
          filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onAction={(nextGroup) => void joinOrOpenGroup(nextGroup)}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Sparkles size={18} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold">No groups match your search</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different keyword or clear the current filter to explore more campus communities.</p>
          </div>
        )}
      </div>

      <GroupDetails
        group={selectedGroup}
        members={groupMembers}
        joinRequests={joinRequests}
        loading={membersLoading}
        onJoinToggle={(group) => void joinOrOpenGroup(group)}
        onLeave={(groupId) => void leaveCurrentGroup(groupId)}
        onApproveRequest={(userId) => void approveRequest(userId)}
        onRejectRequest={(userId) => void rejectRequest(userId)}
      />

      <GroupModal
        open={isCreateOpen}
        onClose={closeCreateModal}
        form={createForm}
        onChange={updateCreateForm}
        categories={categories}
        creating={creating}
        error={createError}
        coverPreview={coverPreview}
        onCoverPreviewChange={setCoverPreview}
        onSubmit={submitCreateGroup}
      />
    </div>
  );
}
