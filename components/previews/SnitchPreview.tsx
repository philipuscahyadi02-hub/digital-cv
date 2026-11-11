"use client";

import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";
import { useInView, useReducedMotion, useSequence } from "./useInView";
import "./previews.css";

// preload: false: only this small preview uses it, so it should not slow the first page load
const display = Anton({ weight: "400", subsets: ["latin"], display: "swap", preload: false });

const CASE_TEXT = "Someone ate the last slice of birthday cake. The fridge was left open.";
const SLAMMER = "RINA SLAMMED.";

// A glimpse of one round, in the game's own look: the case → the talk → SLAM → verdict → fade out.
const STEPS = [
  { scene: "case", ms: 2600 },
  { scene: "talk", ms: 3300 },
  { scene: "black", ms: 450 },
  { scene: "slam", ms: 1300 },
  { scene: "verdict", ms: 1700 },
  { scene: "fade", ms: 1100 },
];

/** Types `text` out while `on`, at roughly `cps` characters a second. */
function useTyped(text: string, on: boolean, cps: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) {
      setN(0);
      return;
    }
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 1000 / cps);
    return () => clearInterval(id);
  }, [on, text, cps]);
  return text.slice(0, n);
}

/** Counts down from 0:32 while `on`, so the glimpse crosses the game's red "under 0:30" moment. */
function useTimer(on: boolean) {
  const [s, setS] = useState(32);
  useEffect(() => {
    if (!on) {
      setS(32);
      return;
    }
    const id = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [on]);
  return { text: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`, hot: s < 30 };
}

export default function SnitchPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const i = useSequence(STEPS, inView && !reduced);
  const scene = reduced ? "talk" : STEPS[i].scene;

  const caseText = useTyped(CASE_TEXT, scene === "case", 40);
  const slammer = useTyped(SLAMMER, scene === "slam", 50);
  const timer = useTimer(scene === "talk");

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated preview of a SNITCH round: the case, the talk with the SLAM button, the slam and the verdict"
      className={`sp on-${scene} ${display.className}`}
    >
      {/* The case: GM text typed into a paper strip */}
      <div className="sp-scene sp-case">
        <p className="sp-title">
          THE<span>CASE</span>
        </p>
        <p className="sp-strip">
          {caseText}
          <span className="sp-cursor" />
        </p>
      </div>

      {/* The talk: timer, ace cards and THE BUTTON bleeding off the edge */}
      <div className="sp-scene sp-talk">
        <p className="sp-label">THE TALK</p>
        <p className={`sp-timer${timer.hot ? " is-hot" : ""}`}>{timer.text}</p>
        <div className="sp-aces">
          <span>GAG</span>
          <span>WHISPER</span>
          <span>ALIBI</span>
        </div>
        <div className="sp-button">SLAM</div>
      </div>

      {/* The slam: instant blackout, then the slammer's name types in */}
      <div className="sp-scene sp-slam">
        <p className="sp-slammer">{slammer}</p>
      </div>

      {/* The verdict: a red stamp on the case file */}
      <div className="sp-scene sp-verdict">
        <p className="sp-file">CASE FILE · ROUND 3</p>
        <p className="sp-stamp">GUILTY</p>
      </div>
    </div>
  );
}
