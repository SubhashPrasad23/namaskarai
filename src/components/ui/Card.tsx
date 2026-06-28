import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl p-6 transition-all duration-300 glass-card",
        hover && "hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className="aspect-video w-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <span className="text-4xl">{alt}</span>
      </div>
    </div>
  );
}
