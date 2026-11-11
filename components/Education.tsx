import { education } from "@/data/resume";
import Reveal from "./Reveal";

export default function Education() {
  const facts = [
    { label: "Focus", value: education.focus },
    { label: "GPA", value: education.gpa },
    { label: "Graduated", value: education.graduated },
  ];

  return (
    <section id="education" className="relative mx-auto max-w-5xl px-6 pb-12 pt-4">
      <Reveal className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-white/20 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-accent/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c3 2 9 2 12 0v-5" />
              </svg>
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Education</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white sm:text-xl">{education.degree}</h3>
              <p className="text-sm text-white/60">{education.school}</p>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 text-center">
            {facts.map((f) => (
              <div key={f.label} className="bg-surface/90 px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-white/50">{f.label}</dt>
                <dd className="mt-1 whitespace-nowrap text-sm font-semibold text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
