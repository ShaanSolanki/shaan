"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("shaan_loaded");
    if (reduced || already) {
      // defer out of the effect body to avoid a synchronous cascading render
      const id = requestAnimationFrame(() => {
        setDone(true);
        onComplete();
      });
      return () => cancelAnimationFrame(id);
    }

    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      sessionStorage.setItem("shaan_loaded", "1");
      setDone(true);
      onComplete();
    };

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const lineEls = termRef.current?.querySelectorAll<HTMLElement>(".term-line") ?? [];

      const tl = gsap.timeline({ onComplete: finish });

      // terminal lines type/fade in
      tl.from(lineEls, { opacity: 0, y: 8, duration: 0.35, stagger: 0.28, ease: "power2.out" });

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
      tl.to(
        root,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power4.inOut" },
        "-=0.1",
      );
    }, root);

    return () => ctx.revert();
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
