import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "success" | "warning";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-primary/10 text-primary": variant === "primary",
          "bg-accent/10 text-accent": variant === "accent",
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": variant === "success",
          "bg-amber-500/10 text-amber-600 dark:text-amber-400": variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
