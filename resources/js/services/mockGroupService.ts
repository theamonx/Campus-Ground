import { CampusGroup, CreateGroupInput, GroupJoinRequestProfile, GroupMemberProfile, GroupMemberRole } from "../types";
import { currentCampusUser, getCampusUserById, getCampusUsers } from "./mockUserService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const storageKey = "campus.groups.joinedIds";
const requestStorageKey = "campus.groups.requestedIds";

const currentUser = currentCampusUser;
const allUsersPromise = getCampusUsers();

function member(userId: number, role: GroupMemberRole, joinedAt: string) {
  return { userId, role, joinedAt };
}

function joinRequest(userId: number, requestedAt: string) {
  return { userId, requestedAt };
}

function loadStoredJoinedIds() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "number") : null;
  } catch {
    return null;
  }
}

function persistJoinedIds(ids: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(ids));
}

function loadStoredRequestedIds() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(requestStorageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "number") : null;
  } catch {
    return null;
  }
}

function persistRequestedIds(ids: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(requestStorageKey, JSON.stringify(ids));
}

function cloneGroup(group: CampusGroup): CampusGroup {
  return {
    ...group,
    members: group.members.map((item) => ({ ...item })),
    joinRequests: group.joinRequests.map((item) => ({ ...item })),
    posts: group.posts.map((item) => ({ ...item })),
    media: group.media.map((item) => ({ ...item })),
    tags: [...group.tags],
  };
}

function hydrateJoinedState(group: CampusGroup) {
  const joined = group.members.some((item) => item.userId === currentUser.id);
  return { ...group, joined };
}

function syncJoinedStateFromStorage(groups: CampusGroup[]) {
  const storedIds = loadStoredJoinedIds() ?? [];
  const storedRequestedIds = loadStoredRequestedIds() ?? [];

  if (!loadStoredJoinedIds()) {
    persistJoinedIds(groups.filter((group) => group.members.some((item) => item.userId === currentUser.id)).map((group) => group.id));
  }

  if (!loadStoredRequestedIds()) {
    persistRequestedIds(groups.filter((group) => group.joinRequests.some((item) => item.userId === currentUser.id)).map((group) => group.id));
  }

  const joinedSet = new Set(storedIds);
  const requestedSet = new Set(storedRequestedIds);
  const synced = groups.map((group) => {
    const hasCurrentUser = group.members.some((item) => item.userId === currentUser.id);
    const hasCurrentRequest = group.joinRequests.some((item) => item.userId === currentUser.id);

    if (joinedSet.has(group.id) && !hasCurrentUser) {
      return {
        ...group,
        members: [...group.members, member(currentUser.id, group.ownerId === currentUser.id ? "owner" : "member", new Date().toISOString())],
      };
    }

    if (!joinedSet.has(group.id) && hasCurrentUser && group.ownerId !== currentUser.id) {
      return {
        ...group,
        members: group.members.filter((item) => item.userId !== currentUser.id),
      };
    }

    if (requestedSet.has(group.id) && !hasCurrentRequest && !hasCurrentUser) {
      return {
        ...group,
        joinRequests: [...group.joinRequests, joinRequest(currentUser.id, new Date().toISOString())],
      };
    }

    if (!requestedSet.has(group.id) && hasCurrentRequest) {
      return {
        ...group,
        joinRequests: group.joinRequests.filter((item) => item.userId !== currentUser.id),
      };
    }

    return group;
  });

  persistJoinedIds(synced.filter((group) => group.members.some((item) => item.userId === currentUser.id)).map((group) => group.id));
  persistRequestedIds(synced.filter((group) => group.joinRequests.some((item) => item.userId === currentUser.id)).map((group) => group.id));
  return synced.map(hydrateJoinedState);
}

const seedGroups: CampusGroup[] = [
  {
    id: 1,
    name: "Night Owls — Study Group",
    description: "Late-night doubt solving, DSA practice, and exam week rescue sessions for the campus grind.",
    category: "Academic",
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=600&fit=crop&auto=format",
    icon: "🦉",
    ownerId: 2,
    ownerName: "Rohan Mehta",
    ownerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&auto=format",
    tags: ["study", "dsa", "exams", "campus"],
    createdAt: "2025-10-04",
    members: [
      member(2, "owner", "2025-10-04"),
      member(1, "member", "2025-10-05"),
      member(3, "member", "2025-10-06"),
      member(6, "admin", "2025-10-08"),
      member(8, "member", "2025-10-10"),
      member(7, "member", "2025-10-12"),
    ],
    posts: [
      { id: 101, authorId: 2, authorName: "Rohan Mehta", authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&auto=format", time: "12m ago", content: "Tonight's session: graphs + shortest paths. Drop your doubts before 10 PM and we’ll queue them up.", media: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=520&fit=crop&auto=format" },
      { id: 102, authorId: 6, authorName: "Karan Singh", authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format", time: "1h ago", content: "Shared a clean template for last-minute revision notes in the pinned docs. Please duplicate instead of editing the original." },
    ],
    media: [
      { id: 201, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=600&fit=crop&auto=format", title: "Late-night study circle" },
      { id: 202, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=600&fit=crop&auto=format", title: "Whiteboard problem solving" },
    ],
    joinRequests: [],
    joined: false,
  },
  {
    id: 2,
    name: "Placement Sprint 2026",
    description: "Resume reviews, interview rounds, company experiences, and placement prep for final year students.",
    category: "Placement",
    privacy: "private",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&auto=format",
    icon: "🚀",
    ownerId: 7,
    ownerName: "Meera Joshi",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
    tags: ["interviews", "resume", "placements", "jobs"],
    createdAt: "2025-09-18",
    members: [
      member(7, "owner", "2025-09-18"),
      member(1, "member", "2025-09-20"),
      member(5, "member", "2025-09-21"),
      member(8, "admin", "2025-09-22"),
      member(4, "member", "2025-09-24"),
      member(11, "member", "2025-09-28"),
    ],
    posts: [
      { id: 103, authorId: 7, authorName: "Meera Joshi", authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format", time: "22m ago", content: "Mock interview slots for tomorrow are live. Please keep the rubric handy and arrive 5 minutes early." },
      { id: 104, authorId: 8, authorName: "Dev Patel", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format", time: "2h ago", content: "Uploaded a fresh list of company-specific DSA sheets in the resources thread." },
    ],
    media: [
      { id: 203, src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop&auto=format", title: "Interview prep huddle" },
      { id: 204, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format", title: "Resume review desk" },
    ],
    joinRequests: [joinRequest(4, "2025-10-16")],
    joined: false,
  },
  {
    id: 3,
    name: "Campus Photo Walkers",
    description: "Sunrise shots, festival reels, portraits, and visual storytelling across the campus.",
    category: "Photography",
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=600&fit=crop&auto=format",
    icon: "📷",
    ownerId: 5,
    ownerName: "Sneha Pillai",
    ownerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format",
    tags: ["photos", "reels", "events", "editors"],
    createdAt: "2025-08-09",
    members: [
      member(5, "owner", "2025-08-09"),
      member(3, "member", "2025-08-10"),
      member(10, "member", "2025-08-14"),
      member(11, "admin", "2025-08-18"),
      member(12, "member", "2025-08-20"),
    ],
    posts: [
      { id: 105, authorId: 5, authorName: "Sneha Pillai", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format", time: "4h ago", content: "Weekend photowalk is back. Meeting outside the admin block at 5:30 AM for sunrise frames." },
    ],
    media: [
      { id: 205, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=600&fit=crop&auto=format", title: "Campus sunrise" },
      { id: 206, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&h=600&fit=crop&auto=format", title: "Portrait workshop" },
    ],
    joinRequests: [],
    joined: false,
  },
  {
    id: 4,
    name: "Indie Builders Club",
    description: "Startup ideas, product feedback, pitch practice, and shipping small things that matter.",
    category: "Startup",
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop&auto=format",
    icon: "🚀",
    ownerId: 8,
    ownerName: "Dev Patel",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    tags: ["startup", "product", "pitch", "hackathon"],
    createdAt: "2025-07-14",
    members: [
      member(8, "owner", "2025-07-14"),
      member(4, "admin", "2025-07-16"),
      member(6, "member", "2025-07-18"),
      member(7, "member", "2025-07-20"),
      member(9, "member", "2025-07-25"),
      member(12, "member", "2025-07-28"),
    ],
    posts: [
      { id: 106, authorId: 8, authorName: "Dev Patel", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format", time: "35m ago", content: "Prototype review on Friday. Bring one screenshot and one painful user problem. We’ll keep the feedback brutal and useful." },
    ],
    media: [
      { id: 207, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop&auto=format", title: "Pitch night" },
      { id: 208, src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop&auto=format", title: "Founder whiteboard" },
    ],
    joinRequests: [],
    joined: false,
  },
  {
    id: 5,
    name: "Futsal & Fitness Crew",
    description: "Morning runs, match schedules, and accountability for staying active through the semester.",
    category: "Fitness",
    privacy: "private",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=600&fit=crop&auto=format",
    icon: "🏋️",
    ownerId: 6,
    ownerName: "Karan Singh",
    ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format",
    tags: ["fitness", "sports", "runs", "workout"],
    createdAt: "2025-06-07",
    members: [
      member(6, "owner", "2025-06-07"),
      member(2, "admin", "2025-06-09"),
      member(9, "member", "2025-06-11"),
      member(10, "member", "2025-06-14"),
      member(12, "member", "2025-06-16"),
    ],
    posts: [
      { id: 107, authorId: 6, authorName: "Karan Singh", authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format", time: "2h ago", content: "5:45 AM futsal slots are confirmed for tomorrow. Hydrate before showing up or you'll hate me by 6:30." },
    ],
    media: [
      { id: 209, src: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=900&h=600&fit=crop&auto=format", title: "Evening run" },
      { id: 210, src: "https://images.unsplash.com/photo-1511886929837-354a90b2d0d5?w=900&h=600&fit=crop&auto=format", title: "Futsal warmup" },
    ],
    joinRequests: [],
    joined: false,
  },
  {
    id: 6,
    name: "Campus Choir Collective",
    description: "Acoustic sessions, jam nights, and low-pressure practice for anyone who wants to make music together.",
    category: "Music",
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop&auto=format",
    icon: "🎵",
    ownerId: 1,
    ownerName: "Ananya Sharma",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format",
    tags: ["music", "choir", "jam", "acoustic"],
    createdAt: "2025-05-22",
    members: [
      member(1, "owner", "2025-05-22"),
      member(3, "member", "2025-05-24"),
      member(7, "admin", "2025-05-25"),
      member(11, "member", "2025-05-27"),
    ],
    posts: [
      { id: 108, authorId: 1, authorName: "Ananya Sharma", authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format", time: "6h ago", content: "Trying a stripped-down arrangement this Thursday. Bring your lyrics notes and one song reference that feels impossible to sing live." },
    ],
    media: [
      { id: 211, src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&h=600&fit=crop&auto=format", title: "Stage rehearsal" },
      { id: 212, src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&h=600&fit=crop&auto=format", title: "Acoustic jam night" },
    ],
    joinRequests: [],
    joined: false,
  },
];

let groupStore: CampusGroup[] = seedGroups.map((group) => cloneGroup(group));

function ensureHydratedStore() {
  groupStore = syncJoinedStateFromStorage(groupStore);
}

function mapGroup(group: CampusGroup): CampusGroup {
  return hydrateJoinedState(cloneGroup(group));
}

function getGroupIndex(groupId: number) {
  return groupStore.findIndex((group) => group.id === groupId);
}

function getJoinedIdSnapshot() {
  return groupStore.filter((group) => group.members.some((item) => item.userId === currentUser.id)).map((group) => group.id);
}

function updateJoinedIdsStorage() {
  persistJoinedIds(getJoinedIdSnapshot());
}

function nextGroupId() {
  return Math.max(...groupStore.map((group) => group.id), 0) + 1;
}

function resolveCoverImage(input?: string | null) {
  return input?.trim() || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&auto=format";
}

export async function listGroups() {
  await delay(650);
  ensureHydratedStore();
  return groupStore.map(mapGroup);
}

export async function getGroupById(groupId: number) {
  await delay(250);
  ensureHydratedStore();
  const group = groupStore.find((item) => item.id === groupId);
  return group ? mapGroup(group) : null;
}

export async function getGroupMembers(groupId: number): Promise<GroupMemberProfile[]> {
  await delay(320);
  ensureHydratedStore();

  const group = groupStore.find((item) => item.id === groupId);
  if (!group) {
    return [];
  }

  const users = await allUsersPromise;
  return group.members
    .map((membership) => {
      const user = users.find((item) => item.id === membership.userId);
      if (!user) {
        return null;
      }

      return {
        user: { ...user },
        role: membership.role,
        joinedAt: membership.joinedAt,
      };
    })
    .filter((item): item is GroupMemberProfile => Boolean(item))
    .sort((left, right) => {
      const order = { owner: 0, admin: 1, member: 2 } as const;
      return order[left.role] - order[right.role];
    });
}

export async function getGroupJoinRequests(groupId: number): Promise<GroupJoinRequestProfile[]> {
  await delay(280);
  ensureHydratedStore();

  const group = groupStore.find((item) => item.id === groupId);
  if (!group) {
    return [];
  }

  const users = await allUsersPromise;
  return group.joinRequests
    .map((request) => {
      const user = users.find((item) => item.id === request.userId);
      if (!user) {
        return null;
      }

      return {
        user: { ...user },
        requestedAt: request.requestedAt,
      };
    })
    .filter((item): item is GroupJoinRequestProfile => Boolean(item));
}

export async function requestJoinGroup(groupId: number) {
  await delay(320);
  ensureHydratedStore();

  const index = getGroupIndex(groupId);
  if (index < 0) {
    throw new Error("Group not found.");
  }

  const group = groupStore[index];
  if (group.members.some((item) => item.userId === currentUser.id)) {
    return mapGroup(group);
  }

  if (group.joinRequests.some((item) => item.userId === currentUser.id)) {
    return mapGroup(group);
  }

  const requestedGroup = {
    ...group,
    joinRequests: [...group.joinRequests, joinRequest(currentUser.id, new Date().toISOString())],
  };

  groupStore[index] = requestedGroup;
  persistRequestedIds(groupStore.filter((item) => item.joinRequests.some((request) => request.userId === currentUser.id)).map((item) => item.id));
  return mapGroup(requestedGroup);
}

export async function approveJoinRequest(groupId: number, userId: number) {
  await delay(320);
  ensureHydratedStore();

  const index = getGroupIndex(groupId);
  if (index < 0) {
    throw new Error("Group not found.");
  }

  const group = groupStore[index];
  if (group.ownerId !== currentUser.id && !group.members.some((item) => item.userId === currentUser.id && item.role === "admin")) {
    throw new Error("Only the owner or an admin can approve requests.");
  }

  const request = group.joinRequests.find((item) => item.userId === userId);
  if (!request) {
    return mapGroup(group);
  }

  if (group.members.some((item) => item.userId === userId)) {
    const updated = {
      ...group,
      joinRequests: group.joinRequests.filter((item) => item.userId !== userId),
    };
    groupStore[index] = updated;
    return mapGroup(updated);
  }

  const updated = {
    ...group,
    members: [...group.members, member(userId, "member", new Date().toISOString())],
    joinRequests: group.joinRequests.filter((item) => item.userId !== userId),
  };

  groupStore[index] = updated;
  persistRequestedIds(groupStore.filter((item) => item.joinRequests.some((itemRequest) => itemRequest.userId === currentUser.id)).map((item) => item.id));
  return mapGroup(updated);
}

export async function rejectJoinRequest(groupId: number, userId: number) {
  await delay(220);
  ensureHydratedStore();

  const index = getGroupIndex(groupId);
  if (index < 0) {
    throw new Error("Group not found.");
  }

  const group = groupStore[index];
  const updated = {
    ...group,
    joinRequests: group.joinRequests.filter((item) => item.userId !== userId),
  };

  groupStore[index] = updated;
  persistRequestedIds(groupStore.filter((item) => item.joinRequests.some((itemRequest) => itemRequest.userId === currentUser.id)).map((item) => item.id));
  return mapGroup(updated);
}

export async function createGroup(input: CreateGroupInput) {
  await delay(500);
  ensureHydratedStore();

  const createdAt = new Date().toISOString();
  const owner = await getCampusUserById(currentUser.id);

  const group: CampusGroup = {
    id: nextGroupId(),
    name: input.name.trim(),
    description: input.description.trim() || "A new campus community space.",
    category: input.category,
    privacy: input.privacy,
    coverImage: resolveCoverImage(input.coverImage),
    icon: input.coverImage ? null : "✨",
    ownerId: currentUser.id,
    ownerName: owner?.fullName ?? currentUser.fullName,
    ownerAvatar: owner?.avatar ?? currentUser.avatar ?? null,
    tags: [input.category.toLowerCase(), "campus", "community"],
    createdAt,
    members: [member(currentUser.id, "owner", createdAt)],
    joinRequests: [],
    posts: [
      {
        id: Date.now(),
        authorId: currentUser.id,
        authorName: owner?.fullName ?? currentUser.fullName,
        authorAvatar: owner?.avatar ?? currentUser.avatar ?? null,
        time: "Just now",
        content: `Welcome to ${input.name.trim()}. This group was created from the campus community module.`,
      },
    ],
    media: [],
    joined: true,
  };

  groupStore = [group, ...groupStore];
  updateJoinedIdsStorage();
  return mapGroup(group);
}

export async function joinGroup(groupId: number) {
  await delay(280);
  ensureHydratedStore();

  const index = getGroupIndex(groupId);
  if (index < 0) {
    throw new Error("Group not found.");
  }

  const group = groupStore[index];
  if (group.members.some((item) => item.userId === currentUser.id)) {
    return mapGroup(group);
  }

  const joinedGroup = {
    ...group,
    members: [...group.members, member(currentUser.id, "member", new Date().toISOString())],
  };

  groupStore[index] = joinedGroup;
  updateJoinedIdsStorage();
  return mapGroup(joinedGroup);
}

export async function leaveGroup(groupId: number) {
  await delay(280);
  ensureHydratedStore();

  const index = getGroupIndex(groupId);
  if (index < 0) {
    throw new Error("Group not found.");
  }

  const group = groupStore[index];
  if (group.ownerId === currentUser.id) {
    return mapGroup(group);
  }

  const nextMembers = group.members.filter((item) => item.userId !== currentUser.id);
  const leftGroup = {
    ...group,
    members: nextMembers,
  };

  groupStore[index] = leftGroup;
  updateJoinedIdsStorage();
  return mapGroup(leftGroup);
}
