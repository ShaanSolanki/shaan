"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Cover } from "./Cover";

/**
 * The signature interaction: hitting Next/Prev makes the current project card
 * flip + roll out in 3D while the next card rolls in from the opposite side.
 * Supports drag/swipe and ← / → keys.
 */
export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(1);
  const animating = useRef(false);
  const mounted = useRef(false);
  const n = projects.length;

  const go = useCallback(
    (d: number) => {
      if (animating.current) return;
      animating.current = true;
      dirRef.current = d;
      gsap.to(cardRef.current, {
        rotateY: -d * 90,
        xPercent: -d * 16,
        scale: 0.9,
        opacity: 0,
        duration: 0.42,
        ease: "power3.in",
        onComplete: () => setIndex((i) => (i + d + n) % n),
      });
    },
    [n],
  );

  // animate the incoming card in whenever the index changes (skip first mount)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const d = dirRef.current;
    gsap.fromTo(
      cardRef.current,
      { rotateY: d * 90, xPercent: d * 16, scale: 0.9, opacity: 0 },
      {
        rotateY: 0,
        xPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 0.62,
        ease: "power3.out",
        onComplete: () => {
          animating.current = false;
        },
      },
    );
  }, [index]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // drag / swipe
  const dragStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => (dragStart.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  const p = projects[index];

  return (
    <section id="work" className="px-5 md:px-8 py-24 md:py-32">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <h2 className="font-Satoshi-Black uppercase leading-none text-4xl md:text-6xl lg:text-7xl">
          Selected Work
        </h2>
        <span className="font-mono text-sm text-[var(--muted)]">04 / Projects</span>
      </div>

      <div className="work-stage grid md:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* the flipping card */}
        <div
          className="md:col-span-7 relative aspect-[4/3] md:aspect-[16/10] select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          data-cursor
        >
          <div
            ref={cardRef}
            className="work-card absolute inset-0 rounded-2xl overflow-hidden border border-[var(--line)] bg-white shadow-[0_50px_90px_-60px_rgba(20,18,12,0.55)]"
          >
            <Cover slug={p.slug} title={p.title} showLabel={false} />
            <div className="absolute left-0 top-0 m-4 rounded-full bg-[var(--paper)]/85 backdrop-blur px-3 py-1 font-mono text-xs text-[var(--ink)]">
              {p.index} / {String(n).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* meta */}
        <div className="md:col-span-5">
          <div className="font-mono text-sm text-[var(--accent)] mb-3">{p.year} · {p.role}</div>
          <h3 className="font-Satoshi-Black text-3xl md:text-5xl leading-none mb-5">{p.title}</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-6 max-w-md">{p.blurb}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-[var(--line)] px-3 py-1 text-sm">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <a
              href={p.href}
              className="group inline-flex items-center gap-1 font-Satoshi-Bold border-b border-[var(--ink)] pb-0.5"
            >
              View project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="flex gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="mt-8 font-mono text-xs text-[var(--muted)]">
            Demo content — real case studies &amp; links coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
