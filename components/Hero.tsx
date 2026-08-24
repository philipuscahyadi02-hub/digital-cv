"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

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
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-20"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <p className={`reveal ${visible} mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent`}>
          {profile.location} · Available for new opportunities
        </p>

        <h1 className={`reveal ${visible} text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl`}>
          {profile.name}
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
          className={`reveal ${visible} mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg`}
          style={{ transitionDelay: "200ms" }}
        >
          {profile.summary}
        </p>

        <div
          className={`reveal ${visible} mt-10 flex flex-wrap items-center gap-4`}
          style={{ transitionDelay: "280ms" }}
        >
          <a
            href="#experience"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-accent-soft hover:shadow-[0_8px_24px_-8px_rgb(var(--accent)/0.6)] active:translate-y-0 active:scale-[0.98]"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:translate-y-0"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/30 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue-dot absolute inset-x-0 top-0 h-2.5 rounded-full bg-accent" />
        </span>
      </div>
    </section>
  );
}
