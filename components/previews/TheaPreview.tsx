"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, useSequence } from "./useInView";
import "./previews.css";

// Théa: the modules I worked on. Production with its cross-filtering slicers, then
// Multifinance and Loss Incurred, then an Excel export.
// Illustrative only: every number here is made up, nothing comes from Oona's data.
const TABS = ["Production", "Multifinance", "Loss Incurred"] as const;

type View = { tab: number; label: string; value: string; bar: number; spark: number[]; chips: number };

const STEPS: ({ phase: string; ms: number } & View)[] = [
  { phase: "idle", ms: 500, tab: 0, label: "GWP vs target", value: "—", bar: 0, spark: [6, 6, 6, 6, 6, 6, 6, 6], chips: 0 },
  { phase: "prod", ms: 1300, tab: 0, label: "GWP vs target", value: "92%", bar: 92, spark: [38, 52, 45, 63, 58, 72, 69, 84], chips: 0 },
  { phase: "l1", ms: 800, tab: 0, label: "GWP vs target", value: "97%", bar: 97, spark: [42, 50, 55, 61, 66, 70, 75, 88], chips: 1 },
  { phase: "l2", ms: 800, tab: 0, label: "GWP vs target", value: "101%", bar: 100, spark: [48, 54, 60, 58, 70, 76, 80, 92], chips: 2 },
  { phase: "l3", ms: 1000, tab: 0, label: "GWP vs target", value: "104%", bar: 100, spark: [50, 58, 63, 66, 74, 79, 85, 96], chips: 3 },
  { phase: "mf", ms: 1400, tab: 1, label: "Vehicle policies", value: "1,284", bar: 74, spark: [30, 44, 40, 52, 61, 57, 68, 73], chips: 0 },
  { phase: "li", ms: 1400, tab: 2, label: "Loss ratio (net)", value: "58%", bar: 58, spark: [62, 55, 60, 52, 57, 49, 54, 58], chips: 0 },
  { phase: "export", ms: 1300, tab: 2, label: "Loss ratio (net)", value: "58%", bar: 58, spark: [62, 55, 60, 52, 57, 49, 54, 58], chips: 0 },
  { phase: "fade", ms: 700, tab: 2, label: "Loss ratio (net)", value: "58%", bar: 58, spark: [62, 55, 60, 52, 57, 49, 54, 58], chips: 0 },
];

export default function TheaPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const i = useSequence(STEPS, inView && !reduced);
  const s = reduced ? STEPS[4] : STEPS[i];

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration of Théa: switching between the Production, Multifinance and Loss Incurred modules, filters narrowing from channel to producer, and an export to Excel"
      className={`th on-${s.phase}`}
    >
      {/* App bar: Théa mark + the modules I worked on */}
      <div className="th-bar-top" aria-hidden>
        <span className="th-logo">θ</span>
        <div className="th-tabs">
          {TABS.map((t, k) => (
            <span key={t} className={`th-tab ${k === s.tab ? "is-on" : ""}`}>
              {/* "Loss Incurred" shortens to "Loss" on the smallest phones */}
              {t === "Loss Incurred" ? (
                <>
                  Loss<span className="th-long"> Incurred</span>
                </>
              ) : (
                t
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="th-dash" aria-hidden>
        <div className="th-side">
          {s.tab === 0 ? (
            <>
              <span className={`th-chip ${s.chips >= 1 ? "is-on" : ""}`}>Channel · Agent</span>
              <span className={`th-chip ${s.chips >= 2 ? "is-on" : ""}`}>Sub-channel</span>
              <span className={`th-chip ${s.chips >= 3 ? "is-on" : ""}`}>Producer</span>
            </>
          ) : s.tab === 1 ? (
            <>
              <span className="th-chip is-on">Motor</span>
              <span className="th-chip">Vehicle age</span>
              <span className="th-chip">Dealer</span>
            </>
          ) : (
            <>
              <span className="th-chip is-on">Net</span>
              <span className="th-chip">Class</span>
              <span className="th-chip">Branch</span>
            </>
          )}
        </div>
        <div className="th-main">
          <div className="th-kpi">
            <span>{s.label}</span>
            <b>{s.value}</b>
          </div>
          <div className="th-bar">
            <span style={{ width: `${s.bar}%` }} />
          </div>
          <div className="th-spark">
            {s.spark.map((h, k) => (
              <span key={k} style={{ height: `${h}%`, transitionDelay: `${k * 50}ms` }} />
            ))}
          </div>
        </div>
      </div>

      <span className="th-toast" aria-hidden>
        ✓ Exported to Excel
      </span>
      <span className="th-note" aria-hidden>
        Illustrative data
      </span>
    </div>
  );
}
