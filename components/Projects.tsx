"use client";

import { useState } from "react";
import { projects, type Sector } from "@/data/resume";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import SectionIndex from "./SectionIndex";

const FILTERS: ("All" | Sector)[] = ["All", "Automotive", "HR Tech", "Internal & B2B"];

// Sector colours: used on the filter chip, the card's tag and its hover border.
const TONE: Record<(typeof FILTERS)[number], { on: string; tag: string; card: string; dot: string }> = {
  All: { on: "border-accent/60 bg-accent/10 text-accent", tag: "", card: "hover:border-accent/30", dot: "bg-accent" },
  Automotive: { on: "border-sky/60 bg-sky/10 text-sky", tag: "border-sky/30 bg-sky/10 text-sky", card: "hover:border-sky/35", dot: "bg-sky" },
  "HR Tech": { on: "border-violet/60 bg-violet/10 text-violet", tag: "border-violet/30 bg-violet/10 text-violet", card: "hover:border-violet/35", dot: "bg-violet" },
  "Internal & B2B": { on: "border-amber/60 bg-amber/10 text-amber", tag: "border-amber/30 bg-amber/10 text-amber", card: "hover:border-amber/35", dot: "bg-amber" },
};

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.sector === filter);
  const count = (f: (typeof FILTERS)[number]) =>
    f === "All" ? projects.length : projects.filter((p) => p.sector === f).length;

  return (
    <section id="projects" data-fx className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionIndex n="04" tone="text-sky" />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Projects
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Selected engagements
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <div role="tablist" aria-label="Filter projects by sector" className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f)}
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-all duration-200 active:scale-[0.97] ${
                  on ? TONE[f].on : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${TONE[f].dot}`} />
                {f}
                <span
                  className={`rounded-full px-1.5 font-mono text-[10px] ${on ? "bg-accent/20" : "bg-white/10"}`}
                >
                  {count(f)}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Keyed by filter so the cards replay their entrance when the filter changes */}
      <div key={filter} className="mt-8 grid gap-5 sm:grid-cols-2">
        {shown.map((p, idx) => (
          <Reveal key={p.name} delay={idx * 60}>
            <TiltCard className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-colors ${TONE[p.sector].card}`}>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  {p.client}
                </p>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] ${TONE[p.sector].tag}`}>
                  {p.sector}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
