"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the element is on screen, so preview loops only run when someone can see them. */
export function useInView(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Runs `steps` in order (each waits `ms` before the next), looping while `active`. */
export function useSequence(steps: { ms: number }[], active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) {
      setI(0);
      return;
    }
    const t = setTimeout(() => setI((n) => (n + 1) % steps.length), steps[i].ms);
    return () => clearTimeout(t);
  }, [i, active, steps]);
  return i;
}
