"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "glass-btn-red rounded-[22px] text-white hover:scale-[1.04]":
              variant === "primary",
            "glass-btn-pink rounded-[22px] text-slate-700 backdrop-blur-md hover:scale-[1.04]":
              variant === "secondary",
            "hover:bg-muted text-foreground rounded-[22px]": variant === "ghost",
            "glass-btn-outline-demo rounded-[22px] text-foreground hover:scale-[1.04]":
              variant === "outline",
            "bg-accent text-white rounded-[22px] hover:scale-[1.04] shadow-md hover:shadow-lg":
              variant === "accent",
          },
          {
            "h-8 px-4 text-sm": size === "sm",
            "h-10 px-6 text-sm": size === "md",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
