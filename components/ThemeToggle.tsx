"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("cv-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("cv-theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isLight ? 0 : 1,
          transform: isLight ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)",
        }}
      >
        <path d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06" />
        <circle cx="12" cy="12" r="4.5" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute h-[16px] w-[16px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isLight ? 1 : 0,
          transform: isLight ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)",
        }}
      >
        <path d="M20.4 14.7A8.4 8.4 0 1 1 9.3 3.6a6.7 6.7 0 0 0 11.1 11.1Z" />
      </svg>
    </button>
  );
}
