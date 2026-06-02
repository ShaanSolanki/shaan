"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface FlipHeadingProps {
  text: string;
  className?: string;
  /** ScrollTrigger start position relative to viewport entry */
  start?: string;
  /** disable the scroll reveal (e.g. inside the hero which animates on load) */
  noReveal?: boolean;
}

/**
 * Oversized display heading where each glyph sits in an overflow-hidden box and
 * masks up into view with a per-letter stagger on scroll-in. Carries two stacked
 * copies so the `.flip-heading` CSS hover-flip works too. Mirrors movie-clone.
 */
export function FlipHeading({ text, className, start = "top 85%", noReveal }: FlipHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (noReveal) return;
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>(".char .reveal-span");
    const ctx = gsap.context(() => {
      gsap.set(spans, { yPercent: 110 });
      gsap.to(spans, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.025,
        // clear the inline transform once revealed so the CSS hover-flip can take over
        clearProps: "transform",
        scrollTrigger: { trigger: el, start },
      });
    }, el);
    return () => ctx.revert();
  }, [start, noReveal]);

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={cn("flip-heading flex flex-wrap", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap" aria-hidden>
          {word.split("").map((ch, ci) => (
            <span key={ci} className="char">
              <span className="reveal-span">{ch}</span>
              <span>{ch}</span>
            </span>
          ))}
          {wi < words.length - 1 && <span className="char">&nbsp;</span>}
        </span>
      ))}
    </h2>
  );
}
