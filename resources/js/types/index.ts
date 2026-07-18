export type Page = "home" | "professor" | "student";

export type Post = {
  id: number;
  author: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  type: "achievement" | "post" | "duel" | "protest" | "event";
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  anon?: boolean;
  tag?: string;
  image?: string;
};

export type Student = {
  id: number;
  name: string;
  roll: string;
  avatar: string;
  attendance: number;
  grade: string;
  gpa: number;
};

export type CampusUser = {
  id: number;
  username: string;
  studentId: string;
  fullName: string;
  department: string;
  year: string;
  avatar?: string | null;
};

export type Assignment = {
  id: number;
  title: string;
  subject: string;
  due: string;
  submitted: number;
  total: number;
  status: "active" | "closed" | "draft";
};

export type Notice = {
  id: number;
  title: string;
  target: string;
  date: string;
  pinned: boolean;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  venue: string;
  registered: number;
  capacity: number;
};

export type Duel = {
  id: number;
  challenger: string;
  challengerAvatar: string;
  challengerId?: number;
  opponent: string;
  opponentAvatar: string;
  opponentId?: number;
  topic: string;
  category: string;
  status: "active" | "pending" | "ended";
  votes: [number, number];
  endsIn?: string;
};

export type CreateChallengeInput = {
  opponentUserId: number;
  topic: string;
  category: string;
};

export type GroupPrivacy = "public" | "private";

export type GroupCategory =
  | "Academic"
  | "Coding"
  | "Placement"
  | "Sports"
  | "Gaming"
  | "Music"
  | "Photography"
  | "Fitness"
  | "Startup"
  | "Clubs"
  | "Others";

export type GroupMemberRole = "owner" | "admin" | "member";

export type GroupJoinRequest = {
  userId: number;
  requestedAt: string;
};

export type GroupJoinRequestProfile = {
  user: CampusUser;
  requestedAt: string;
};

export type GroupMember = {
  userId: number;
  role: GroupMemberRole;
  joinedAt: string;
};

export type GroupMemberProfile = {
  user: CampusUser;
  role: GroupMemberRole;
  joinedAt: string;
};

export type GroupPost = {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar?: string | null;
  time: string;
  content: string;
  media?: string;
};

export type GroupMedia = {
  id: number;
  src: string;
  title: string;
};

export type CampusGroup = {
  id: number;
  name: string;
  description: string;
  category: GroupCategory;
  privacy: GroupPrivacy;
  coverImage?: string | null;
  icon?: string | null;
  ownerId: number;
  ownerName: string;
  ownerAvatar?: string | null;
  tags: string[];
  createdAt: string;
  members: GroupMember[];
  joinRequests: GroupJoinRequest[];
  posts: GroupPost[];
  media: GroupMedia[];
  joined: boolean;
};

export type CreateGroupInput = {
  name: string;
  description: string;
  category: GroupCategory;
  privacy: GroupPrivacy;
  coverImage?: string | null;
};

export type Club = {
  id: number;
  name: string;
  emoji: string;
  members: number;
  category: string;
  joined: boolean;
  desc: string;
};

export type Protest = {
  id: number;
  title: string;
  support: number;
  comments: number;
  status: "active" | "resolved" | "escalated";
  anon: boolean;
  time: string;
  body: string;
};

export type Achievement = {
  id: number;
  title: string;
  category: string;
  date: string;
  icon: string;
  points: number;
  verified: boolean;
};

// Append this to your existing resources/js/types/index.ts

export interface PageSharedProps {
    auth: {
        user: CampusUser;
        // You can add extra session tags here, like permissions or token structures
    };
    flash: {
        success?: string | null;
        error?: string | null;
    };
    [key: string]: any; // Fallback index signature to support general Inertia properties
}
