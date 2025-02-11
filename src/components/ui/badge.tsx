import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant: "success" | "destructive";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-white text-xs font-semibold rounded-md",
        variant === "success" ? "bg-green-500" : "bg-red-500"
      )}
    >
      {children}
    </span>
  );
};
