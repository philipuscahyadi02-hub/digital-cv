"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

// One hue per stat tile (full class names so Tailwind keeps them)
const STAT_TONES = [
  { text: "text-accent", line: "bg-accent" },
  { text: "text-sky", line: "bg-sky" },
  { text: "text-amber", line: "bg-amber" },
  { text: "text-coral", line: "bg-coral" },
];

/** Counts the number inside a stat ("20+", "100%", "4 yrs") up from 0, keeping its prefix/suffix. */
function CountUp({ value, start, delay }: { value: string; start: boolean; delay: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || !start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - t0) / 1100));
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target, delay]);

  if (!match) return <>{value}</>;
  return (
    <span className="tabular-nums">
      {match[1]}
      {n}
      {match[3]}
    </span>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    setMounted(true);
    return () => clearInterval(id);
  }, []);

  const visible = mounted ? "is-visible" : "";

  return (
    <section
      id="top"
      data-fx
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-20"
    >
      <div className="fx-hero-out relative mx-auto w-full max-w-5xl">
        <p className={`reveal ${visible} mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent`}>
          {profile.location} · Available for new opportunities
        </p>

        <h1 className={`reveal ${visible} text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl`}>
          <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text pb-1 text-transparent">
            {profile.name}
          </span>
        </h1>

        <div
          className={`reveal ${visible} mt-5 h-9 font-mono text-lg text-white/60 sm:text-xl`}
          style={{ transitionDelay: "120ms" }}
        >
          <span className="text-accent">{profile.roles[roleIndex]}</span>
          <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 animate-blink bg-accent/70 align-middle" />
        </div>

        <p
          className={`reveal ${visible} mt-7 max-w-2xl text-balance text-lg font-medium leading-snug text-white/85 sm:text-xl`}
          style={{ transitionDelay: "160ms" }}
        >
          {profile.tagline}
        </p>

        <p
          className={`reveal ${visible} mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg`}
          style={{ transitionDelay: "200ms" }}
        >
          {profile.pitch}
        </p>

        <dl
          className={`reveal ${visible} mt-9 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4`}
          style={{ transitionDelay: "240ms" }}
        >
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative bg-surface/90 px-4 py-4 transition-colors duration-300 hover:bg-surface/60 sm:px-5"
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-[0.25] opacity-70 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100 ${STAT_TONES[i % 4].line}`}
              />
              <dt className="sr-only">{s.label}</dt>
              <dd
                className={`text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-3xl ${STAT_TONES[i % 4].text}`}
              >
                <CountUp value={s.value} start={mounted} delay={300 + i * 120} />
              </dd>
              <dd className="mt-1 text-xs leading-snug text-white/55">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div
          className={`reveal ${visible} mt-9 flex flex-wrap items-center gap-4`}
          style={{ transitionDelay: "280ms" }}
        >
          <a
            href="#experience"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-accent-soft hover:shadow-[0_8px_24px_-8px_rgb(var(--accent)/0.6)] active:translate-y-0 active:scale-[0.98]"
          >
            View my work
          </a>
          <a
            href="/Philipus-Cahyadi-Resume.pdf"
            download
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:translate-y-0"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="px-2 py-3 text-sm font-medium text-white/60 transition-colors hover:text-accent"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}
