import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "success" | "warning" | "default";
  trend?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  variant = "default",
  trend,
}: StatCardProps) {
  const variantStyles = {
    success: "from-success/20 to-success/5 border-success/20",
    warning: "from-warning/20 to-warning/5 border-warning/20",
    default: "from-primary/10 to-accent/5 border-border",
  };

  const iconVariantStyles = {
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    default: "bg-primary/20 text-primary",
  };

  return (
    <Card
      className={cn(
        "hover-lift border bg-gradient-to-br",
        variantStyles[variant]
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-xl",
              iconVariantStyles[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
