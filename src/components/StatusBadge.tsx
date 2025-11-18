import { Badge } from "@/components/ui/badge";

type Status = "active" | "pending" | "completed" | "declined" | "no-response";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  declined: { label: "Declined", variant: "destructive" },
  "no-response": { label: "No Response", variant: "secondary" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
