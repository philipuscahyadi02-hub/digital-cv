"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,192,0.12),transparent_60%)]"
        />
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">
          Contact
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let's build something worth shipping.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
          Open to Business Analyst, Presales, and Product roles. Based in {profile.location}.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={copyEmail}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03] hover:bg-accent-soft"
          >
            {copied ? "Copied ✓" : profile.email}
          </button>
          <a
            href={`https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
          >
            {profile.phone}
          </a>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center gap-2 text-center">
        <p className="font-mono text-xs text-white/30">
          © {new Date().getFullYear()} {profile.name}. Built for the next role.
        </p>
      </footer>
    </section>
  );
}
