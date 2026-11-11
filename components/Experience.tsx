"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/resume";
import Reveal from "./Reveal";
import SectionIndex from "./SectionIndex";

/** How far the timeline has been read (0..1) and which role is at the reading line. */
function useTimelineProgress() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const line = window.innerHeight * 0.55; // the "reading line" just below the middle
      const rect = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (line - rect.top) / rect.height)));
      const items = Array.from(list.children) as HTMLElement[];
      let idx = -1;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) idx = i;
      });
      setActive(idx);
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

  return { listRef, progress, active };
}

// Numbers are the proof recruiters scan for ("20+", "10%", "3"), so every number gets emphasis.
const METRIC = /(\d+(?:[.,]\d+)?(?:\+|%)?)/g;

function withMetrics(text: string) {
  return text.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function Experience() {
  const { listRef, progress, active } = useTimelineProgress();

  return (
    <section id="experience" data-fx className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionIndex n="01" tone="text-accent" />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Where I've delivered
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* Track, then the part already read, which fills as you scroll */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[9px]" />
        <div
          aria-hidden
          className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-accent/30 shadow-[0_0_8px_rgb(var(--accent)/0.6)] sm:left-[9px]"
          style={{ height: `calc((100% - 1rem) * ${progress})` }}
        />

        <ol ref={listRef} className="space-y-14">
          {experience.map((job, idx) => (
            <li key={`${job.company}-${job.period}`} className="relative pl-10 sm:pl-12">
              <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5">
                <span
                  className={`absolute h-full w-full rounded-full transition-all duration-500 ${
                    idx === active ? "scale-150 bg-accent/30 shadow-[0_0_14px_rgb(var(--accent)/0.7)]" : idx < active ? "bg-accent/20" : "bg-white/10"
                  }`}
                />
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-500 ${idx <= active ? "bg-accent" : "bg-white/30"}`}
                />
              </span>

              <Reveal delay={idx * 60}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3
                    className={`text-lg font-semibold transition-colors duration-500 sm:text-xl ${
                      idx === active ? "text-accent" : "text-white"
                    }`}
                  >
                    {job.title}
                  </h3>
                  <span className="font-mono text-xs text-white/60">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{job.company}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/60">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      <span>{withMetrics(h)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
