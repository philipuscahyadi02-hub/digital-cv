"use client";

import { useMemo, useRef } from "react";
import { useInView, useReducedMotion, useSequence } from "./useInView";
import "./previews.css";


// Sprite maps and palettes copied from onikiri/src/sprites.js and src/content.js (skin "Akane").
// One letter = one pixel, '.' = transparent.
const SAM_ROWS = [
  "....hhhh....", "...hhhhhh...", "..hhhhhhhh..", "..hsssssshh.", "..sskssksh..", "..ssssssshh.",
  "...ssss..h..", "..wwwwwwww..", ".wwwwwwwwww.", ".wwwwrrwwww.", ".wwwrrrrwww.", "..wwrrrrww..",
  "..gggggggg..", "..wwwwwwww..", "..wwwwwwww..", "..ww....ww..", "..kk....kk..", "..kk....kk..",
];
const GRUNT_ROWS = [
  "...kkkk...", "..kkkkkk..", "..kkkkkk..", "..ke..ek..", "..kkkkkk..", "...kkkk...", ".kkkkkkkk.",
  "kkkkkkkkkk", "k.kkkkkk.k", "..kkkkkk..", "..kkrrkk..", "..kkkkkk..", "..kk..kk..", "..kk..kk..",
];
const AKANE = { h: "#2a1b2e", w: "#f2ece2", r: "#d8323c", s: "#f6d7c3", g: "#f0c35a", k: "#1a1420" };
const GRUNT = { k: "#221b2b", e: "#d8323c", r: "#d8323c" };
const ARCHER = { k: "#1b2740", e: "#4fb3ff", r: "#4fb3ff" };
const NINJA = { k: "#2a1a3a", e: "#9b6cff", r: "#9b6cff" };

/** Draws a character map as crisp SVG pixels (runs of the same colour merged per row). */
function Sprite({ rows, pal, px, className }: { rows: string[]; pal: Record<string, string>; px: number; className?: string }) {
  const rects = useMemo(() => {
    const out: { x: number; y: number; w: number; c: string }[] = [];
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const ch = row[x];
        let end = x + 1;
        while (end < row.length && row[end] === ch) end++;
        if (pal[ch]) out.push({ x, y, w: end - x, c: pal[ch] });
        x = end;
      }
    });
    return out;
  }, [rows, pal]);
  return (
    <svg
      className={className}
      width={rows[0].length * px}
      height={rows.length * px}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </svg>
  );
}

// One loop: a grunt from the left (PERFECT), an archer from the right (GOOD), a ninja dash
// (PERFECT, combo 3), then the Shura Slash ult turns the sky to Fever.
const STEPS = [
  { phase: "idle", ms: 700, score: 0, combo: 0 },
  { phase: "l-in", ms: 800, score: 0, combo: 0 },
  { phase: "l-hit", ms: 650, score: 300, combo: 1 },
  { phase: "r-in", ms: 750, score: 300, combo: 1 },
  { phase: "r-hit", ms: 650, score: 400, combo: 2 },
  { phase: "n-in", ms: 450, score: 400, combo: 2 },
  { phase: "n-hit", ms: 700, score: 700, combo: 3 },
  { phase: "ult", ms: 1300, score: 1400, combo: 3 },
  { phase: "fade", ms: 600, score: 1400, combo: 3 },
];

export default function OnikiriPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const i = useSequence(STEPS, inView && !reduced);
  const step = reduced ? STEPS[2] : STEPS[i];
  const p = step.phase;
  const facingLeft = p === "l-in" || p === "l-hit" || p === "n-in" || p === "n-hit";
  const callout = p === "l-hit" || p === "n-hit" ? "PERFECT" : p === "r-hit" ? "GOOD" : null;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated preview of Onikiri: a samurai strikes enemies rushing from both sides, then unleashes the Shura Slash"
      className={`ok on-${p}`}
    >
      <div className="ok-sky" aria-hidden />
      <div className="ok-moon" aria-hidden />
      <div className="ok-rays" aria-hidden />

      <div className="ok-hud" aria-hidden>
        <span>
          SCORE <b>{String(step.score).padStart(5, "0")}</b>
        </span>
        <span className={step.combo > 1 ? "is-on" : ""}>COMBO ×{step.combo}</span>
      </div>

      <div className="ok-ground" aria-hidden />
      <span className="ok-line ok-line-l" aria-hidden />
      <span className="ok-line ok-line-r" aria-hidden />

      <Sprite rows={GRUNT_ROWS} pal={GRUNT} px={3} className="ok-foe ok-grunt" />
      <Sprite rows={GRUNT_ROWS} pal={ARCHER} px={3} className="ok-foe ok-archer" />
      <Sprite rows={GRUNT_ROWS} pal={NINJA} px={3} className="ok-foe ok-ninja" />

      <div className={`ok-sam ${facingLeft ? "is-left" : ""}`}>
        <Sprite rows={SAM_ROWS} pal={AKANE} px={3} />
      </div>
      <span className="ok-slash ok-slash-l" aria-hidden />
      <span className="ok-slash ok-slash-r" aria-hidden />

      {callout && (
        <span key={p} className={`ok-callout ${callout === "PERFECT" ? "is-perfect" : ""}`} aria-hidden>
          {callout}
        </span>
      )}
      <span className="ok-ult" aria-hidden>
        <b>修羅斬</b>
        <small>SHURA SLASH · FEVER</small>
      </span>
    </div>
  );
}
