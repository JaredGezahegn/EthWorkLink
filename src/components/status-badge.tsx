import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  accepted: "bg-success/15 text-accent-foreground border-success/30",
  completed: "bg-primary/15 text-primary border-primary/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
  approved: "bg-success/15 text-accent-foreground border-success/30",
  active: "bg-success/15 text-accent-foreground border-success/30",
  suspended: "bg-destructive/15 text-destructive border-destructive/30",
  seeker: "bg-secondary/15 text-secondary border-secondary/30",
  provider: "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
        variants[status] || "bg-muted text-muted-foreground border-border"
      )}
    >
      {status}
    </span>
  );
}
