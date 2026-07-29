import { useRef, useState } from "react";
import { Shield, Send, Image, Link2, Hash, Trophy, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Eye, EyeOff } from "lucide-react";
import StudentLayout from '@/layouts/student-layout';
import { useStudent } from '@/contexts/StudentContext';
import { AnonAvatar, UserAvatar, TypePill } from "@/common";
import type { Post } from "@/types";
import type { Auth } from '@/types/auth';
import { useAuth } from '@/hooks/use-auth';
import { router, usePage, useForm } from '@inertiajs/react';

// const feedPosts: Post[] = [
//   { id: 1, author: "Meera Joshi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", handle: "@meera.joshi", time: "2m ago", type: "achievement", content: "Just cleared HackBit 2025 and placed 1st in the Systems track! 8 months of grinding finally paid off. Thank you @DevClub for the prep sessions 🏆", tag: "Achievement", likes: 148, comments: 24, liked: false, saved: false },
//   { id: 2, author: "Anonymous", avatar: "", handle: "@anon·protected", time: "14m ago", type: "protest", content: "The library closes at 8 PM during exam week. That's actively hurting our preparation. We need 24-hour access at least during finals. Who's with me?", tag: "Protest", likes: 312, comments: 67, liked: true, saved: false, anon: true },
//   { id: 3, author: "Dev Club", avatar: "", handle: "@devclub.official", time: "1h ago", type: "event", content: "Winter Hackathon registrations are open! 48 hours, ₹50,000 in prizes, and a chance to present to real VCs. Teams of 2–4. Last 30 spots left.", tag: "Event", likes: 89, comments: 15, liked: false, saved: true, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=280&fit=crop&auto=format" },
//   { id: 4, author: "Rohan Mehta", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format", handle: "@rohan.m", time: "3h ago", type: "duel", content: "Just accepted @karan.s's LeetCode duel. Medium difficulty, 45 mins. Voting closes in 2 hours — who do you think solves it first? 🔥", tag: "Duel", likes: 43, comments: 19, liked: false, saved: false },
//   { id: 5, author: "Ananya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", handle: "@ananya.s", time: "5h ago", type: "achievement", content: "Google Summer of Code 2025 acceptance just dropped into my inbox. Genuinely cannot believe it. Years of open source contributions — this is what it was for.", tag: "Achievement", likes: 426, comments: 58, liked: true, saved: true },
// ];

export default function StuFeed({ thoughts }) {
  const { user } = useAuth();
  const { anon } = useStudent();
  const { errors } = usePage().props;
  const [posts, setPosts] = useState(thoughts);
  const [draft, setDraft] = useState("");
  const [draftTag, setDraftTag] = useState("");
  const [draftLink, setDraftLink] = useState("");
  const [draftImage, setDraftImage] = useState("");
  const [draftType, setDraftType] = useState<Post["type"]>("post");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toggleLike = (id: number) => setPosts(p => p.map(x => x.id === id ? { ...x, liked: !x.liked, likes: x.liked ? x.likes - 1 : x.likes + 1 } : x));
  const toggleSave = (id: number) => setPosts(p => p.map(x => x.id === id ? { ...x, saved: !x.saved } : x));

  const handleFileUpload = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;

      if (typeof result === "string") {
        setDraftImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const publishPost = () => {
    const message = draft.trim();

    if (!message && !draftLink && !draftImage) {
      return;
    }

    const nextPost: Post = {
      user : user,
      time: "Just now",
      message: message || draftLink || "Shared a campus update.",
      type: draftType,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      anon: anon ? true : false,
      tag: draftTag || undefined,
      image: draftImage || undefined,
    };


    const newPost = {
      message: message || draftLink || "Shared a campus update.",
      type: draftType || 'post',
    };
    router.post('/student', newPost, {
        preserveState: true,
        preserveScroll: true,
    });

    setPosts(current => [nextPost, ...current]);
    setDraft("");
    setDraftTag("");
    setDraftLink("");
    setDraftImage("");
    setDraftType("post");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <div className="bg-card border border-border rounded-2xl relative z-20 p-4">
        <div className="flex flex-col items-start gap-3 mb-3">
          <div className="flex gap-4 items-start text-sm font-bold">
          {anon ? <AnonAvatar /> : user.avatar ? <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" /> : <UserAvatar />}

              {anon ? <p>Anonymous</p> : <div className="flex flex-col"><p>{user.name}</p> <span className="text-muted-foreground italic text-xs">{user.email}</span></div> }
          </div>
          <div className="flex flex-col w-full gap-2">
            <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder={anon ? "Posting anonymously…" : "What's on your mind?"} className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"></textarea>
            {(draftLink || draftImage) && (
              <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                {draftLink && <span className="bg-secondary border border-border px-2 py-1 rounded-full truncate max-w-full">Link attached</span>}
                {draftImage && <span className="bg-secondary border border-border px-2 py-1 rounded-full">Image attached</span>}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {[{ icon: Image, label: "Photo" }, { icon: Link2, label: "Link" }, { icon: Hash, label: "Tag" }, { icon: Trophy, label: "Achievement" }].map(({ icon: Icon, label }) => (
            <button key={label} type="button" onClick={() => {
              if (label === "Photo") {
                fileInputRef.current?.click();
                return;
              }

              if (label === "Link") {
                const link = window.prompt("Attach a link");
                if (link) {
                  setDraftLink(link.trim());
                }
                return;
              }

              if (label === "Tag") {
                const tag = window.prompt("Add a tag");
                if (tag) {
                  setDraftTag(tag.trim());
                }
                return;
              }

              setDraftType("achievement");
              setDraftTag("Achievement");
            }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"><Icon size={13} />{label}</button>
          ))}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFileUpload(event.target.files?.[0])} />
          <button onClick={publishPost} className="ml-auto absolute sm:static top-4 right-4 flex items-center gap-1.5 bg-primary text-background px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"><Send size={12} />Post</button>
        </div>
        {anon && <div className="mt-2 flex items-center gap-2 text-[10px] text-primary bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/10"><Shield size={10} />Your identity is protected in this post</div>}
      </div>
      {posts.map(post => (
        <div key={post.user?.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {post.anon ? <AnonAvatar /> : post.user?.avatar ? <img src={post.user?.avatar} alt={post.user?.name} className="w-10 h-10 rounded-full object-cover" /> : <UserAvatar/>}
              <div>
                <div className="flex items-center gap-2"><p className="text-sm font-semibold">{post.user?.name}</p>{post.anon ? <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20"><Shield size={8} />Protected</span> : ''}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span>{post.user?.email}</span><span>·</span><span>{post.relative_time}</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2"><TypePill type={post.type} /><button className="text-muted-foreground hover:text-foreground p-1"><MoreHorizontal size={15} /></button></div>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{post.message}</p>
          {post.image && <div className="rounded-xl overflow-hidden bg-secondary"><img src={post.image} alt="Post" className="w-full object-cover max-h-60" /></div>}
          <div className="flex items-center gap-1 pt-1 border-t border-border/50">
            <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors ${post.liked ? "text-red-400 bg-red-500/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              <Heart size={14} fill={post.liked ? "currentColor" : "none"} />{post.likes}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><MessageCircle size={14} />{post.comments}</button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Share2 size={14} />Share</button>
            <button onClick={() => toggleSave(post.id)} className={`ml-auto p-2 rounded-lg transition-colors ${post.saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              <Bookmark size={14} fill={post.saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

StuFeed.layout = (page: React.ReactNode) => <StudentLayout children={page} />;
