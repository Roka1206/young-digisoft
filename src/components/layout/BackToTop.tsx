"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className={cn(
        "fixed bottom-24 right-7.5 z-40 inline-flex size-11 items-center justify-center rounded-full bg-action text-action-fg shadow-lg transition-[opacity,translate,scale,visibility] duration-200 hover:scale-108 active:scale-95",
        visible ? "visible opacity-100" : "invisible translate-y-3 opacity-0"
      )}
    >
      <ArrowUp size={20} />
    </button>
  );
}
