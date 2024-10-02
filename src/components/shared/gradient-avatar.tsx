import React from "react";
import { twMerge } from "tailwind-merge";

interface GradientAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function generateGradient(name: string): string {
  const hash = hashCode(name);
  const hue1 = hash % 360;
  const hue2 = (hash * 13) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function GradientAvatar({
  name,
  size = "md",
  className,
}: GradientAvatarProps) {
  const gradient = generateGradient(name);
  const initials = getInitials(name);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  return (
    <div
      className={twMerge(
        "rounded-full flex items-center justify-center font-semibold text-white",
        sizeClasses[size],
        className
      )}
      style={{ background: gradient }}
    >
      {initials}
    </div>
  );
}
