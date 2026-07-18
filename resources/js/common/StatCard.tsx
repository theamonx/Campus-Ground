import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  trend?: "up" | "down";
  color?: "indigo" | "orange" | "green" | "red";
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  color = "indigo",
}: StatCardProps) {
  const iconBg = {
    indigo: "bg-indigo-500/10 text-indigo-400",
    orange: "bg-orange-500/10 text-orange-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
  }[color];

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={15} />
        </div>
      </div>
      <div>
        <p
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {value}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" && <TrendingUp size={11} className="text-green-400" />}
          {trend === "down" && <TrendingDown size={11} className="text-red-400" />}
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
      </div>
    </div>
  );
}
