import * as React from "react";
import { cn } from "/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-brand-blue text-white hover:bg-brand-blue/90",
        variant === "outline" && "border border-gray-300 hover:bg-gray-100",
        variant === "ghost" && "hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}