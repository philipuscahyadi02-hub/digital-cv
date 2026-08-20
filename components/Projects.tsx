import { projects } from "@/data/resume";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Projects
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Selected engagements
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((p, idx) => (
          <Reveal key={p.name} delay={(idx % 2) * 80}>
            <TiltCard className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-accent/30">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                {p.client}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
