"use client";

import { useRef, type CSSProperties } from "react";
import { TAMA_CLASSES, TAMA_SVG, TAMA_VARS } from "./tamaRig";
import { useInView, useReducedMotion, useSequence } from "./useInView";
import "./previews.css";

// One loop: hidden → peeks over the edge → hops out → waves with hearts → notices you → runs off.
const STEPS = [
  { phase: "hidden", mood: "normal", ms: 1400 },
  { phase: "peek", mood: "normal", ms: 1100 },
  { phase: "out", mood: "happy", ms: 600 },
  { phase: "wave", mood: "sparkle", ms: 1700 },
  { phase: "notice", mood: "shock", ms: 700 },
  { phase: "run", mood: "happy", ms: 1100 },
  { phase: "gone", mood: "happy", ms: 900 },
];

export default function TamaPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const i = useSequence(STEPS, inView && !reduced);
  const step = reduced ? { phase: "wave", mood: "happy" } : STEPS[i];

  return (
    <div
      ref={ref}
      aria-label="Animated preview: Tama peeks out, waves and runs away"
      role="img"
      className={`tp tp-${step.phase}`}
    >
      <div className="tp-sky" aria-hidden />
      <div className="tp-x">
        <div className="tp-y">
          <div className={`tama-rig mood-${step.mood} ${TAMA_CLASSES}`}>
            <svg
              className="rig-svg"
              viewBox="0 0 200 240"
              style={TAMA_VARS as CSSProperties}
              dangerouslySetInnerHTML={{ __html: TAMA_SVG }}
            />
          </div>
          <span className="tp-mark" aria-hidden>!</span>
          <span className="tp-heart tp-heart-1" aria-hidden>♥</span>
          <span className="tp-heart tp-heart-2" aria-hidden>♥</span>
          <span className="tp-heart tp-heart-3" aria-hidden>♥</span>
        </div>
      </div>
      <div className="tp-ledge" aria-hidden />
      <div className="tp-dust" aria-hidden />
    </div>
  );
}
