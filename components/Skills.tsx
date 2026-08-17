import { skills } from "@/data/resume";
import Reveal from "./Reveal";

function SkillGroup({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  return (
    <Reveal delay={delay} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75 transition-colors hover:border-accent/40 hover:text-accent"
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
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">
          Skills &amp; Tools
        </h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What I work with
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <SkillGroup title="Business & Analytical" items={skills.business} delay={0} />
        <SkillGroup title="Tools & Technologies" items={skills.tools} delay={100} />
      </div>
    </section>
  );
}
