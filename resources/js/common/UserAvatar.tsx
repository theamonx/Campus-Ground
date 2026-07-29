import { User } from "lucide-react";

export function UserAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
      <User size={16} className="text-slate-400" />
    </div>
  );
}
