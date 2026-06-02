"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Cover } from "./Cover";

/** Pinned stacked deck (mwg_effect018): cards start fanned out and collapse into a neat stack on scroll. */
export function WorkDeck() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll<HTMLElement>(".card");
    const center = (cards.length - 1) / 2;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: (center - i) * 95,
          rotate: (i - center) * 6,
          scale: 0.92,
          zIndex: cards.length - Math.abs(center - i),
        });
      });
      gsap.to(cards, {
        xPercent: 0,
        rotate: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="px-5 md:px-8 pt-24 md:pt-28">
        <span className="font-mono text-sm text-[var(--muted)]">The deck</span>
      </div>

      <section ref={sectionRef} className="mwg_effect018 hidden md:block">
        <div className="pin-height">
          <div className="container">
            {projects.map((p) => (
              <div key={p.slug} className="card">
                <div className="relative flex-1 w-full overflow-hidden rounded-[0.7vw]">
                  <Cover slug={p.slug} title={p.title} />
                </div>
                <div className="pt-3 flex items-baseline justify-between">
                  <span className="font-Satoshi-Bold text-[var(--ink)] text-lg">{p.title}</span>
                  <span className="font-mono text-xs text-[var(--muted)]">{p.index}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* mobile carousel */}
      <div className="w-full py-8 md:hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-2">
          {projects.map((p) => (
            <div key={p.slug} className="snap-center shrink-0 w-[72vw]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <Cover slug={p.slug} title={p.title} />
              </div>
              <div className="pt-2 font-Satoshi-Bold">{p.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
