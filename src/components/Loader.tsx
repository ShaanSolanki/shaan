"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const LINES = [
  "> initializing portfolio…",
  "> import { Shaan } from 'developers'",
  "> loading intelligence · voice · automation",
  "> npm run shaan --production",
];

/**
 * Bespoke developer loading screen: a "compiling" terminal types Shaan's
 * identity while a 0→100 counter fills a hairline bar; at 100 the SHAAN SOLANKI
 * wordmark locks in and the whole panel clip-wipes up to hand off to the hero.
 * Runs once per session; skipped entirely under reduced-motion.
 */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);
  const startedRef = useRef(false); // guards against React StrictMode double-mount
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Quick-exit before the browser paints when we shouldn't animate (a reload
  // within the same session, or reduced-motion). Running this as a layout effect
  // removes the loader *before* paint, so it never flashes its terminal on reload.
  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("shaan_loaded");
    if (reduced || already) {
      setDone(true);
      onComplete();
      return;
    }
    // pre-hide the terminal lines before paint so they don't flash fully-visible
    // for one frame before the type-in animation starts.
    const lineEls = termRef.current?.querySelectorAll<HTMLElement>(".term-line");
    if (lineEls) gsap.set(lineEls, { opacity: 0, y: 8 });
  }, [onComplete]);

  useEffect(() => {
    // Run the intro exactly once. Under React StrictMode (dev) effects fire
    // twice; without this guard the timeline is built, reverted, then rebuilt —
    // which is why the loading screen appeared to play a second time.
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("shaan_loaded");
    if (reduced || already) {
      onComplete();
      setDone(true);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      // No node to animate — never strand the page behind a hidden hero.
      onComplete();
      setDone(true);
      return;
    }

    // Remove the loader node + remember the session once the wipe has fully run.
    const finish = () => {
      sessionStorage.setItem("shaan_loaded", "1");
      setDone(true);
    };

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const lineEls = termRef.current?.querySelectorAll<HTMLElement>(".term-line") ?? [];

      // safety re-assert of the hidden start state (already set pre-paint in the
      // layout effect above) so the type-in always animates from 0.
      gsap.set(lineEls, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ onComplete: finish });

      // terminal lines type/fade in
      tl.to(lineEls, { opacity: 1, y: 0, duration: 0.35, stagger: 0.28, ease: "power2.out" });

      // counter 0 → 100 + bar fill
      tl.to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0.2,
      );
      tl.to(barRef.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.2);

      // wordmark settles in
      tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

      // choreographed exit — terminal/counter lift, then panel clip-wipes up
      tl.to([termRef.current, wordmarkRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
      // Hand off to the hero the moment the wipe starts, so its title masks up
      // in sync with the panel clearing away — no dead gap between the two.
      tl.to(
        root,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power4.inOut", onStart: onComplete },
        "-=0.1",
      );
    }, root);

    // No cleanup/revert here on purpose: this is a one-shot intro that runs a
    // single time per session and removes itself when finished. Reverting on the
    // StrictMode dev unmount would abort the animation mid-flight.
    void ctx;
  }, [onComplete]);

  if (done) return null;

  return (
    <div ref={rootRef} className="loader" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <div className="w-[min(620px,86vw)] px-2">
        <div ref={termRef} className="font-mono text-[13px] md:text-sm text-[var(--muted)] leading-relaxed mb-10">
          {LINES.map((l, i) => (
            <div key={i} className="term-line">
              {l}
              {i === LINES.length - 1 && (
                <span className="ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] bg-[var(--accent)] animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <div
          ref={wordmarkRef}
          className="font-Satoshi-Black text-[var(--ink)] text-4xl md:text-6xl leading-none mb-6 opacity-0 translate-y-3"
        >
          SHAAN SOLANKI
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-[var(--line)] overflow-hidden">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-[var(--accent)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span ref={counterRef} className="font-mono text-sm md:text-base text-[var(--ink)] tabular-nums">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
