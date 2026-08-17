import { experience } from "@/data/resume";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">
          Experience
        </h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Where I've delivered
        </p>
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent sm:left-[9px]" />

        <ol className="space-y-14">
          {experience.map((job, idx) => (
            <li key={`${job.company}-${job.period}`} className="relative pl-10 sm:pl-12">
              <Reveal delay={idx * 60}>
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5">
                  <span className="absolute h-full w-full rounded-full bg-accent/20" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {job.title}
                  </h3>
                  <span className="font-mono text-xs text-white/40">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent/90">{job.company}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/60">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      <span>{h}</span>
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
