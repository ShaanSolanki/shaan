"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "AI Product Builder",
  "Automation Engineer",
  "Real-Time Systems",
];

const title = "SHAAN";
const title2 = "SOLANKI";

export function Hero({ ready }: { ready: boolean }) {
  const [role, setRole] = useState(0);

  // rotating role word — starts once the loader has handed off
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [ready]);

  // Title letters get a left-to-right stagger via a per-letter --d delay. Index
  // runs across both words so SOLANKI continues where SHAAN left off.
  let letter = 0;

  return (
    <section
      id="top"
      className={`hero ${ready ? "is-ready" : "is-loading"} min-h-screen flex flex-col justify-center px-5 md:px-8 pt-28 md:pt-32`}
    >
      <div className="overflow-hidden">
        <h1
          className="hero-line font-Satoshi-Black leading-[0.92] text-[18vw] md:text-[13vw] lg:text-[11vw]"
          aria-label="Shaan Solanki"
        >
          {[title, title2].map((word, wi) => (
            <span key={wi} className="flex">
              {word.split("").map((ch, ci) => {
                const d = letter++ * 0.04;
                return (
                  <span key={ci} className="char">
                    <span className="reveal-span" style={{ "--d": `${d}s` } as React.CSSProperties}>
                      {ch}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>

      <div className="border-t border-[var(--line)] mt-10 md:mt-14 mb-7 md:mb-9" />

      <div className="md:grid grid-cols-12 gap-5 font-Satoshi-Medium">
        <div
          className="hero-meta col-span-2 text-[var(--muted)] text-sm"
          style={{ "--d": "0.5s" } as React.CSSProperties}
        >
          01 / Intro
        </div>
        <div
          className="hero-meta col-span-6 lg:col-span-5 mt-4 md:mt-0"
          style={{ "--d": "0.62s" } as React.CSSProperties}
        >
          <p className="text-base md:text-lg leading-relaxed">
            I build intelligent, automation-driven products with Next.js, Firebase, and AI — voice
            systems, real-time apps, SaaS, and interfaces that feel a step into the future.
          </p>
        </div>
        <div
          className="hero-meta col-start-9 lg:col-start-10 col-span-4 lg:col-span-3 mt-6 md:mt-0"
          style={{ "--d": "0.74s" } as React.CSSProperties}
        >
          <div className="text-sm text-[var(--muted)]">Currently</div>
          <div className="relative h-7 overflow-hidden mt-1">
            <span key={role} className="block font-Satoshi-Bold text-[var(--ink)] text-lg role-word">
              {ROLES[role]}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 mt-10 text-sm text-[var(--muted)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            (Scroll)
          </div>
        </div>
      </div>

      <style>{`
        .role-word { animation: roleIn 0.5s cubic-bezier(0.76,0,0.24,1); }
        @keyframes roleIn { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .role-word { animation: none; } }
      `}</style>
    </section>
  );
}
