import { useState } from 'react';
import { Settings, CheckCircle, X, Save, Pencil } from 'lucide-react';

export function StuProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Priya Nair',
    handle: '@priya.nair',
    year: 'CS 3rd Year',
    college: 'IIT Bombay',
    bio: 'Full-stack dev, open source contributor, occasional writer. Building in public.',
    skills: ['React', 'Python', 'System Design', 'Open Source', 'ML Basics'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=200&fit=crop&auto=format',
    posts: '84',
    followers: '1.2k',
    following: '340',
    campusPoints: '1,650',
  });

  const [editForm, setEditForm] = useState(profile);
  const [newSkill, setNewSkill] = useState('');

  const stats = [
    { label: 'Posts', value: profile.posts },
    { label: 'Followers', value: profile.followers },
    { label: 'Following', value: profile.following },
    { label: 'Campus Points', value: profile.campusPoints },
  ];

  const achievements = [
    { id: 1, title: 'Google Summer of Code 2025', category: 'Internship', date: 'Nov 2025', icon: '🌟', points: 500, verified: true },
    { id: 2, title: 'HackBit 2025 — 2nd Place', category: 'Hackathon', date: 'Oct 2025', icon: '🏅', points: 350, verified: true },
    { id: 3, title: 'Published on Medium (10k reads)', category: 'Writing', date: 'Sep 2025', icon: '✍️', points: 200, verified: false },
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm({ ...editForm, skills: [...editForm.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm({ ...editForm, skills: editForm.skills.filter(s => s !== skillToRemove) });
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleInputChange(field, result);
    };
    reader.readAsDataURL(file);
  };

  const shareProfile = () => {
    const profileLink = `${window.location.origin}${window.location.pathname}#student`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profileLink);
      window.alert("Profile link copied to clipboard.");
      return;
    }

    window.prompt("Copy your profile link", profileLink);
  };

  const viewAllAchievements = () => {
    window.alert("All achievements are shown here in the achievements tab.");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Cover Image */}
        <div className="h-36 relative">
          <img 
            src={isEditing ? editForm.cover : profile.cover} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-30" 
          />
          {isEditing && (
            <label className="absolute top-3 right-3 p-2 bg-black/40 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer">
              <Pencil size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('cover', e.target.files[0])}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            {/* Profile Picture */}
            <div className="relative group">
              <img 
                src={isEditing ? editForm.avatar : profile.avatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-2xl object-cover border-4 border-card" 
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-card" />
              {isEditing && (
                <label className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                  <Pencil size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload('avatar', e.target.files[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => { setEditForm(profile); setIsEditing(true); }}
                    className="px-4 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-card transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button onClick={shareProfile} className="px-4 py-1.5 bg-primary text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Share
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSave} 
                    className="px-4 py-1.5 bg-primary text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="px-4 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-card transition-colors flex items-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

       
       
          {isEditing ? (
            <div className="space-y-4">
             


              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Handle</label>
                  <input
                    type="text"
                    value={editForm.handle}
                    onChange={(e) => handleInputChange('handle', e.target.value)}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground"
                    placeholder="@handle"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Year & Branch</label>
                  <input
                    type="text"
                    value={editForm.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground"
                    placeholder="CS 3rd Year"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">College</label>
                <input
                  type="text"
                  value={editForm.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground"
                  placeholder="Your college name"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills Editor */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground"
                    placeholder="Add a skill..."
                  />
                  <button 
                    onClick={addSkill} 
                    className="px-4 py-2 bg-primary text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editForm.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs bg-primary/20 border border-primary/40 px-3 py-1 rounded-full text-foreground flex items-center gap-2"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)} 
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Info - View Mode */}
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {profile.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-1">
                {profile.handle} · {profile.year} · {profile.college}
              </p>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {profile.skills.map((s) => (
                  <span key={s} className="text-xs bg-secondary border border-border px-3 py-1 rounded-full text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Recent Achievements
          </p>
          <button onClick={viewAllAchievements} className="text-xs text-primary hover:underline">View all</button>
        </div>
        <div className="flex flex-col gap-2">
          {achievements.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors">
              <span className="text-xl w-8 text-center">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground">
                  {a.category} · {a.date}
                </p>
              </div>
              {a.verified && <CheckCircle size={14} className="text-primary flex-shrink-0" />}
              <span className="text-xs font-bold text-accent">+{a.points}pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Activity Section */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="font-semibold text-sm mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Campus Activity
        </p>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 84 }).map((_, i) => {
            const level = [0, 1, 2, 3][i % 4];
            const bg = ['bg-secondary', 'bg-primary/20', 'bg-primary/40', 'bg-primary/80'][level];
            return <div key={i} className={`w-4 h-4 rounded-sm ${bg}`} />;
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">84 contributions in the last semester</p>
      </div>
    </div>
  );
}
