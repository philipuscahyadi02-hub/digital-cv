"use client";

import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useInView, useReducedMotion, useSequence } from "./useInView";
import "./previews.css";

// preload: false: only this small preview uses it, so it should not slow the first page load
const jakarta = Plus_Jakarta_Sans({ weight: ["500", "700", "800"], subsets: ["latin"], display: "swap", preload: false });

// A glimpse of the WangKu dashboard (its own tokens: blue #1A4FA0, gold #D4A339, red for overdue):
// totals count up → commitments slide in → the overdue debt gets paid → totals settle → fade.
const STEPS = [
  { phase: "empty", ms: 500 },
  { phase: "stats", ms: 1100 },
  { phase: "rows", ms: 1500 },
  { phase: "tap", ms: 600 },
  { phase: "paid", ms: 2000 },
  { phase: "fade", ms: 800 },
];

const ROWS = [
  { name: "Netflix", kind: "Langganan · 12 Nov", amount: 186_000, icon: "N", tone: "sub" },
  { name: "Shopee PayLater", kind: "Cicilan 3/6 · 15 Nov", amount: 412_000, icon: "S", tone: "pay" },
  { name: "Utang ke Andi", kind: "Lewat 3 hari", amount: 650_000, icon: "A", tone: "debt" },
] as const;

const DUE = ROWS.reduce((s, r) => s + r.amount, 0);
const OVERDUE = 650_000;

const idr = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");

/** Animates a number towards `target` over `ms`. */
function useCountTo(target: number, ms = 700) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - k, 3);
      const next = a + (target - a) * eased;
      from.current = next;
      setV(next);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

export default function WangkuPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const i = useSequence(STEPS, inView && !reduced);
  const phase = reduced ? "rows" : STEPS[i].phase;

  const shown = phase !== "empty";
  const paid = phase === "paid" || phase === "fade";
  const due = useCountTo(!shown ? 0 : paid ? DUE - OVERDUE : DUE);
  const overdue = useCountTo(!shown ? 0 : paid ? 0 : OVERDUE);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated preview of the WangKu dashboard: monthly dues, an overdue debt being marked as paid"
      className={`wk on-${phase} ${jakarta.className}`}
    >
      <div className="wk-head">
        <span className="wk-logo">
          Wang<b>Ku</b>
        </span>
        <span className="wk-tab">Beranda</span>
      </div>

      <div className="wk-stats">
        <div className="wk-stat">
          <span className="wk-stat-label">Due this month</span>
          <span className="wk-stat-num">{idr(due)}</span>
        </div>
        <div className={`wk-stat wk-stat-warn${paid ? " is-clear" : ""}`}>
          <span className="wk-stat-label">{paid ? "Semua beres" : "Overdue"}</span>
          <span className="wk-stat-num">{paid ? "✓ " + idr(overdue) : idr(overdue)}</span>
        </div>
      </div>

      <ul className="wk-rows">
        {ROWS.map((r, n) => (
          <li
            key={r.name}
            className={`wk-row wk-${r.tone}${r.tone === "debt" && paid ? " is-paid" : ""}`}
            style={{ transitionDelay: phase === "rows" ? `${n * 140}ms` : "0ms" }}
          >
            <span className="wk-ico">{r.icon}</span>
            <span className="wk-name">
              {r.name}
              <small>{r.tone === "debt" && paid ? "Lunas · baru saja" : r.kind}</small>
            </span>
            <span className="wk-amt">{idr(r.amount)}</span>
            {r.tone === "debt" && <span className="wk-ripple" aria-hidden />}
          </li>
        ))}
      </ul>
    </div>
  );
}
