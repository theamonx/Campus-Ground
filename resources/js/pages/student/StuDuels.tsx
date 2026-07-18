import { Swords, Clock, CheckCircle, XCircle, Zap, User } from "lucide-react";
import { ChallengeSomeoneModal } from "./duels/ChallengeSomeoneModal";
import { useStuDuelWorkflow } from "@/hooks/useStuDuelWorkflow";

export function StuDuels({ anon: _ }: { anon: boolean }) {
  const {
    duels,
    duelsLoading,
    isChallengeOpen,
    openChallenge,
    closeChallenge,
    usersLoading,
    filteredUsers,
    searchValue,
    updateSearchValue,
    selectedUser,
    selectUser,
    topic,
    setTopic,
    category,
    setCategory,
    submitting,
    submitChallenge,
    accept,
    decline,
  } = useStuDuelWorkflow();

  const catColors: Record<string, string> = { Coding: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", Quiz: "text-blue-400 bg-blue-500/10 border-blue-500/20", Debate: "text-orange-400 bg-orange-500/10 border-orange-500/20" };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Duels</h1><p className="text-sm text-muted-foreground">Challenge and compete with anyone on campus</p></div>
        <button
          onClick={openChallenge}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Swords size={14} />
          Challenge Someone
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{ label: "Coding", icon: "💻", desc: "LeetCode, DSA, System Design" }, { label: "Quiz", icon: "🧠", desc: "Any subject — you set the rules" }, { label: "Debate", icon: "🎙", desc: "Motion-based, community voted" }, { label: "Creative", icon: "🎨", desc: "Design, writing, music" }].map(c => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-4 hover:border-orange-500/20 hover:-translate-y-0.5 transition-all cursor-pointer">
            <span className="text-2xl mb-2 block">{c.icon}</span>
            <p className="text-sm font-semibold">{c.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {duelsLoading ? (
          [1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-card border border-border rounded-2xl p-5 animate-pulse space-y-4">
              <div className="h-4 w-2/5 rounded bg-secondary" />
              <div className="h-3 w-1/3 rounded bg-secondary" />
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary" />
                <div className="h-3 w-24 rounded bg-secondary" />
                <div className="flex-1 h-px bg-secondary" />
                <div className="h-3 w-24 rounded bg-secondary" />
                <div className="h-9 w-9 rounded-full bg-secondary" />
              </div>
            </div>
          ))
        ) : duels.map(d => {
          const totalVotes = d.votes[0] + d.votes[1];
          const pct0 = totalVotes ? Math.round((d.votes[0] / totalVotes) * 100) : 50;
          const isMe = d.opponent === "You";
          return (
            <div key={d.id} className={`bg-card border rounded-2xl overflow-hidden ${d.status === "pending" && isMe ? "border-orange-500/30" : "border-border"}`}>
              {d.status === "pending" && isMe && (
                <div className="bg-orange-500/10 border-b border-orange-500/20 px-5 py-2 flex items-center justify-between">
                  <p className="text-xs text-orange-400 font-medium flex items-center gap-1.5"><Zap size={11} />You have been challenged!</p>
                  <div className="flex gap-2">
                    <button onClick={() => accept(d.id)} className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-lg hover:bg-green-500/20 transition-colors"><CheckCircle size={11} />Accept</button>
                    <button onClick={() => decline(d.id)} className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-lg hover:bg-red-500/20 transition-colors"><XCircle size={11} />Decline</button>
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{d.topic}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] border px-2 py-0.5 rounded-full ${catColors[d.category]}`}>{d.category}</span>
                      {d.status === "active" && d.endsIn && <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={9} />Ends in {d.endsIn}</span>}
                      {d.status === "ended" && <span className="text-[10px] text-muted-foreground">Ended</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0"><img src={d.challengerAvatar} alt={d.challenger} className="w-9 h-9 rounded-full object-cover flex-shrink-0" /><p className="text-sm font-medium truncate">{d.challenger}</p></div>
                  <div className="flex-shrink-0 text-lg font-black text-muted-foreground">VS</div>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <p className="text-sm font-medium truncate">{d.opponent}</p>
                    {d.opponentAvatar ? <img src={d.opponentAvatar} alt={d.opponent} className="w-9 h-9 rounded-full object-cover flex-shrink-0" /> : <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><User size={14} className="text-muted-foreground" /></div>}
                  </div>
                </div>
                {totalVotes > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>{pct0}%</span><span>{100 - pct0}%</span></div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden flex">
                      <div className="h-full bg-indigo-500 rounded-l-full transition-all" style={{ width: `${pct0}%` }} />
                      <div className="h-full bg-orange-500 rounded-r-full transition-all" style={{ width: `${100 - pct0}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5"><span>{d.votes[0]} votes</span><span>{totalVotes} total</span><span>{d.votes[1]} votes</span></div>
                  </div>
                )}
                {d.status === "active" && totalVotes > 0 && (
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 text-xs py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors font-medium">Vote {d.challenger.split(" ")[0]}</button>
                    <button className="flex-1 text-xs py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors font-medium">Vote {d.opponent.split(" ")[0]}</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <ChallengeSomeoneModal
          open={isChallengeOpen}
          onClose={closeChallenge}
          usersLoading={usersLoading}
          filteredUsers={filteredUsers}
          searchValue={searchValue}
          onSearchValueChange={updateSearchValue}
          selectedUser={selectedUser}
          onSelectUser={selectUser}
          topic={topic}
          onTopicChange={setTopic}
          category={category}
          onCategoryChange={setCategory}
          submitting={submitting}
          onSubmit={submitChallenge}
        />
      </div>
    </div>
  );
}
