import { skills } from "@/data/resume";
import Reveal from "./Reveal";
import SectionIndex from "./SectionIndex";

// Each group owns a hue: business = teal, tools = amber, Claude = coral (Claude's own warm tone).
const TONES = {
  teal: {
    title: "text-accent",
    dot: "bg-accent",
    box: "hover:border-accent/30",
    chip: "hover:border-accent/50 hover:text-accent hover:shadow-[0_4px_16px_-4px_rgb(var(--accent)/0.4)]",
  },
  amber: {
    title: "text-amber",
    dot: "bg-amber",
    box: "hover:border-amber/30",
    chip: "hover:border-amber/50 hover:text-amber hover:shadow-[0_4px_16px_-4px_rgb(var(--hue-amber)/0.4)]",
  },
} as const;

function SkillGroup({
  title,
  items,
  delay,
  tone,
}: {
  title: string;
  items: string[];
  delay: number;
  tone: keyof typeof TONES;
}) {
  const t = TONES[tone];
  return (
    <Reveal delay={delay} className={`rounded-2xl border border-white/10 bg-card p-6 transition-colors sm:p-8 ${t.box}`}>
      <h3 className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] ${t.title}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
        {title}
      </h3>
      <div className="stagger mt-5 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={item}
            style={{ "--i": i } as React.CSSProperties}
            className={`rounded-full border border-white/10 bg-card px-3.5 py-1.5 text-sm text-white/75 ${t.chip}`}
          >
            {item}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" data-fx className="relative mx-auto max-w-5xl px-6 pb-6 pt-28">
      <SectionIndex n="03" tone="text-amber" />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Skills &amp; Tools
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What I work with
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <SkillGroup title="Business & Analytical" items={skills.business} delay={0} tone="teal" />
        <SkillGroup title="Tools & Technologies" items={skills.tools} delay={100} tone="amber" />
      </div>

      <Reveal
        delay={200}
        className="relative mt-6 overflow-hidden rounded-2xl border border-coral/30 bg-gradient-to-br from-coral/[0.07] via-transparent to-violet/[0.06] p-6 transition-colors hover:border-coral/50 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-coral/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-violet/10 blur-3xl"
        />
        <div className="relative flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-coral">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            </svg>
            Building with Claude
          </h3>
          <a href="#builds" className="font-mono text-[11px] text-white/50 transition-colors hover:text-coral">
            See what I built →
          </a>
        </div>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          I take products from PRD to shipped code by directing Claude as a coding agent, keeping the
          product, safety and design decisions with me.
        </p>
        <div className="stagger relative mt-5 flex flex-wrap gap-2">
          {skills.claude.map((item, i) => (
            <span
              key={item}
              style={{ "--i": i } as React.CSSProperties}
              className="rounded-full border border-coral/25 bg-coral/[0.06] px-3.5 py-1.5 text-sm text-white/80 hover:border-coral/60 hover:text-coral hover:shadow-[0_4px_16px_-4px_rgb(var(--hue-coral)/0.45)]"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
