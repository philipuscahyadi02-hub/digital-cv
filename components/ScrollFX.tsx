"use client";

import { useEffect, useState } from "react";

/** Sections shown on the rail, each in its own colour (matches the section's look). */
const SECTIONS = [
  { id: "experience", label: "Experience", tone: "bg-accent", text: "text-accent" },
  { id: "builds", label: "Builds", tone: "bg-rose", text: "text-rose" },
  { id: "skills", label: "Skills", tone: "bg-amber", text: "text-amber" },
  { id: "projects", label: "Projects", tone: "bg-sky", text: "text-sky" },
  { id: "contact", label: "Contact", tone: "bg-violet", text: "text-violet" },
];

/**
 * One scroll listener for every scroll effect on the page. It writes CSS variables instead of React
 * state, so scrolling never re-renders the page:
 *  - on each `[data-fx]` section: --sp (0 → 1 as the section travels through the viewport)
 *    --exit (0 → 1 as the section scrolls off the top) and --enter (0 → 1 as it comes into view)
 *  - on the rail: --rail-p (how far through the active section you are)
 * React state only changes when the active section changes.
 */
export default function ScrollFX() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const rail = document.getElementById("section-rail");

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-fx]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const sp = (vh - r.top) / (vh + r.height);
        const exit = -r.top / Math.max(1, r.height);
        el.style.setProperty("--sp", Math.min(1, Math.max(0, sp)).toFixed(4));
        el.style.setProperty("--exit", Math.min(1, Math.max(0, exit)).toFixed(4));
        // --enter: 0 when the section's top touches the bottom of the screen, 1 once it is 60% up.
        // Works for the last section too, which can never scroll to the middle of the screen.
        const enter = (vh - r.top) / (vh * 0.6);
        el.style.setProperty("--enter", Math.min(1, Math.max(0, enter)).toFixed(4));
      });

      // Active section = the one crossing the reading line (40% down the screen)
      const line = vh * 0.4;
      let current: string | null = null;
      let progress = 0;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          current = s.id;
          progress = (line - r.top) / r.height;
        }
      }
      rail?.style.setProperty("--rail-p", progress.toFixed(4));
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      id="section-rail"
      aria-label="Page sections"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 xl:flex ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {SECTIONS.map((s) => {
        const on = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
            className="group flex h-6 items-center justify-end gap-2"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                on ? `${s.text} opacity-100` : "text-white/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`relative block overflow-hidden rounded-full transition-all duration-500 ${
                on ? "h-1.5 w-10 bg-white/15" : `h-1.5 w-1.5 ${s.tone} opacity-50 group-hover:opacity-100`
              }`}
            >
              {on && (
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${s.tone}`}
                  style={{ width: "calc(var(--rail-p, 0) * 100%)" }}
                />
              )}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
