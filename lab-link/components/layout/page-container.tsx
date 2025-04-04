import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "narrow" | "wide" | "full";
}

export function PageContainer({
  children,
  className,
  maxWidth = "default",
}: PageContainerProps) {
  const maxWidthClass = {
    default: "max-w-7xl",
    narrow: "max-w-3xl",
    wide: "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "container mx-auto px-4 py-8 md:px-6 md:py-12",
        maxWidthClass[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
} 