import { builds, profile } from "@/data/resume";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import SectionIndex from "./SectionIndex";
import TamaPreview from "./previews/TamaPreview";
import SnitchPreview from "./previews/SnitchPreview";
import WangkuPreview from "./previews/WangkuPreview";
import OnikiriPreview from "./previews/OnikiriPreview";

// Each build wears its own app's colour: Tama pink, SNITCH alarm red/coral, WangKu banking blue.
const TONES = {
  tama: {
    card: "hover:border-rose/40",
    glow: "bg-rose/15",
    tag: "text-rose",
    chip: "border-rose/25 bg-rose/[0.06]",
    link: "text-rose",
    bar: "from-rose/80 to-rose/0",
  },
  snitch: {
    card: "hover:border-coral/40",
    glow: "bg-coral/15",
    tag: "text-coral",
    chip: "border-coral/25 bg-coral/[0.06]",
    link: "text-coral",
    bar: "from-coral/80 to-coral/0",
  },
  onikiri: {
    card: "hover:border-amber/40",
    glow: "bg-amber/15",
    tag: "text-amber",
    chip: "border-amber/25 bg-amber/[0.06]",
    link: "text-amber",
    bar: "from-amber/80 to-amber/0",
  },
  wangku: {
    card: "hover:border-sky/40",
    glow: "bg-sky/15",
    tag: "text-sky",
    chip: "border-sky/25 bg-sky/[0.06]",
    link: "text-sky",
    bar: "from-sky/80 to-sky/0",
  },
} as const;
const DEFAULT_TONE = {
  card: "hover:border-accent/30",
  glow: "bg-accent/10",
  tag: "text-white/60",
  chip: "border-white/10",
  link: "text-accent",
  bar: "from-accent/80 to-accent/0",
};

export default function Builds() {
  return (
    <section id="builds" data-fx className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionIndex n="02" tone="text-rose" />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Builds
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Things I&apos;ve built
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          Personal products I took from PRD to shipped code, on{" "}
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {builds.map((b, idx) => {
          const t = b.preview ? TONES[b.preview] : DEFAULT_TONE;
          return (
          <Reveal key={b.name} delay={(idx % 3) * 80}>
            <TiltCard className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-colors ${t.card}`}>
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${t.bar}`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${t.glow}`}
              />
              {b.preview && (() => {
                const preview = (
                  <>
                    {b.preview === "tama" && <TamaPreview />}
                    {b.preview === "snitch" && <SnitchPreview />}
                    {b.preview === "wangku" && <WangkuPreview />}
                    {b.preview === "onikiri" && <OnikiriPreview />}
                  </>
                );
                // A playable build: the preview links straight to the live site (new tab)
                return b.play ? (
                  <a
                    href={b.play}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Play ${b.name} (opens the live site in a new tab)`}
                    className="group/play relative mb-5 block w-full"
                  >
                    {preview}
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition-colors duration-300 group-hover/play:bg-black/45">
                      <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-[#ff2a2a] text-white opacity-0 shadow-[0_0_0_6px_rgba(255,42,42,0.25)] transition-all duration-300 group-hover/play:scale-100 group-hover/play:opacity-100">
                        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="mb-5">{preview}</div>
                );
              })()}
              <p className={`font-mono text-[11px] uppercase tracking-wider ${t.tag}`}>
                {b.tagline}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{b.name}</h3>
                {b.status && (
                  <span className="status-badge rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                    {b.status}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{b.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {b.stack.map((s) => (
                  <li
                    key={s}
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] text-white/75 ${t.chip}`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {b.play && (
                  <a
                    href={b.play}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ff2a2a] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(255,42,42,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff4040] active:translate-y-0 active:scale-[0.98]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play {b.name} <span aria-hidden>↗</span>
                  </a>
                )}
                {b.live && (
                  <a
                    href={b.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm hover:underline ${t.link}`}
                  >
                    Live demo <span aria-hidden>→</span>
                  </a>
                )}
                {b.repo && (
                  <a
                    href={b.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm hover:underline ${t.link}`}
                  >
                    View on GitHub <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </TiltCard>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}
