import { Protest } from "../../types";

export function ProtestStatus({ status }: { status: Protest["status"] }) {
  const map = {
    active: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    resolved: "bg-green-500/10 text-green-400 border-green-500/20",
    escalated: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const label = {
    active: "Active",
    resolved: "Resolved ✓",
    escalated: "Escalated ↑",
  };

  return (
    <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-full ${map[status]}`}>
      {label[status]}
    </span>
  );
}
