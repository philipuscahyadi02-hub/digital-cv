"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import Reveal from "./Reveal";

const socialLinks = [
  {
    name: "LinkedIn",
    href: profile.social.linkedin,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.8c0-1.38-.03-3.16-2.02-3.16-2.02 0-2.33 1.5-2.33 3.06V21h-4V9Z" />
    ),
  },
  {
    name: "GitHub",
    href: profile.social.github,
    icon: (
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.56 1.38.21 2.4.1 2.65.65.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    ),
  },
  {
    name: "Instagram",
    href: profile.social.instagram,
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41a3.74 3.74 0 0 1-1.38-.89 3.74 3.74 0 0 1-.89-1.38c-.17-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.14 1.39A5.9 5.9 0 0 0 .61 4.16c-.3.76-.5 1.63-.56 2.91C.01 8.35 0 8.76 0 12s.01 3.65.07 4.93c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.63.5 2.91.56C8.35 23.99 8.76 24 12 24s3.65-.01 4.93-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.84.63c-.76-.3-1.63-.5-2.91-.56C15.65.01 15.24 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    ),
  },
];

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

        <div className="relative mt-8 flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                {link.icon}
              </svg>
            </a>
          ))}
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
