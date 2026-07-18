import { Assignment } from "../../types";

export function AssignBadge({ status }: { status: Assignment["status"] }) {
  const map = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    closed: "bg-muted text-muted-foreground border-border",
    draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${map[status]}`}>
      {status}
    </span>
  );
}
