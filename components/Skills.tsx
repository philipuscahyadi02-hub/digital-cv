import { skills } from "@/data/resume";
import Reveal from "./Reveal";

function SkillGroup({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  return (
    <Reveal delay={delay} className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-white/20 sm:p-8">
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-card px-3.5 py-1.5 text-sm text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-[0_4px_16px_-4px_rgb(var(--accent)/0.35)]"
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
    <section id="skills" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Skills &amp; Tools
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What I work with
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <SkillGroup title="Business & Analytical" items={skills.business} delay={0} />
        <SkillGroup title="Tools & Technologies" items={skills.tools} delay={100} />
      </div>
    </section>
  );
}
