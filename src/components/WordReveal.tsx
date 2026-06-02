"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Word-by-word reveal on scroll-scrub (mwg_effect029). Each word lifts from a
 * dim/low state to full as the section scrolls through — choreographed, slow.
 */
export function WordReveal({
  text,
  className,
  eyebrow,
}: {
  text: string;
  className?: string;
  eyebrow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".w");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12, yPercent: 30 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom bottom", scrub: 1 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="px-5 md:px-8 py-[16vh]">
      {eyebrow && <div className="font-mono text-xs md:text-sm text-[var(--muted)] mb-8">{eyebrow}</div>}
      <p className={cn("font-Satoshi-Black leading-[1.08] max-w-[18ch] md:max-w-[22ch]", className)}>
        {text.split(" ").map((word, i) => (
          <span key={i} className="w inline-block pr-[0.28em]">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
