"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** 顶部导航栏（滚动时显示毛玻璃效果） */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-lg font-bold text-text-primary">
          Jarod
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}