"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ROLES = [
  "Full-Stack Developer",
  "AI Product Builder",
  "Automation Engineer",
  "Real-Time Systems",
];

export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);

  // Hide the title letters AND the meta blocks under their start state BEFORE the
  // first paint, so the loader wipe never flashes them un-animated. Done with GSAP
  // (not CSS) so the markup itself stays visible if JS never runs — the content is
  // always there. Hiding the meta here is what prevents the "bottom text appears,
  // then blanks, then the title drops in" glitch when the loader hands off.
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(root.querySelectorAll(".hero-line .reveal-span"), { yPercent: 110 });
    gsap.set(root.querySelectorAll(".hero-meta"), { opacity: 0, y: 18 });
  }, []);

  // intro: title masks up, meta fades — fires when the loader hands off
  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const spans = root.querySelectorAll<HTMLElement>(".hero-line .reveal-span");
      const tl = gsap.timeline();
      tl.to(spans, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.04 });
      // animate the meta TO its resting state (it was pre-hidden above) so it
      // never snaps from a visible frame to blank.
      tl.to(".hero-meta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // rotating role word
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [ready]);

  const title = "SHAAN";
  const title2 = "SOLANKI";

  return (
    <section ref={rootRef} id="top" className="min-h-screen flex flex-col justify-center px-5 md:px-8 pt-28 md:pt-32">
      <div className="overflow-hidden">
        <h1 className="hero-line font-Satoshi-Black leading-[0.92] text-[18vw] md:text-[13vw] lg:text-[11vw]" aria-label="Shaan Solanki">
          {[title, title2].map((word, wi) => (
            <span key={wi} className="flex">
              {word.split("").map((ch, ci) => (
                <span key={ci} className="char">
                  <span className="reveal-span">{ch}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="border-t border-[var(--line)] mt-10 md:mt-14 mb-7 md:mb-9" />

      <div className="md:grid grid-cols-12 gap-5 font-Satoshi-Medium">
        <div className="hero-meta col-span-2 text-[var(--muted)] text-sm">01 / Intro</div>
        <div className="hero-meta col-span-6 lg:col-span-5 mt-4 md:mt-0">
          <p className="text-base md:text-lg leading-relaxed">
            I build intelligent, automation-driven products with the MERN stack and AI — voice
            systems, real-time apps, SaaS, and interfaces that feel a step into the future.
          </p>
        </div>
        <div className="hero-meta col-start-9 lg:col-start-10 col-span-4 lg:col-span-3 mt-6 md:mt-0">
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
