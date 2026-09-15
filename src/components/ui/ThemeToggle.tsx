"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:text-brand",
        className
      )}
    >
      <Sun className="dark:hidden" size={18} />
      <Moon className="hidden dark:block" size={18} />
    </button>
  );
}
