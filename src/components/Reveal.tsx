"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  src: string;
  alt: string;
  className?: string;
}

/** Image inside a clip-path mask that wipes up + scales in as it scrolls into view. */
export function Reveal({ src, alt, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector("img");
    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(img, { scale: 1.3 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out" }).to(
        img,
        { scale: 1, duration: 1.2, ease: "power3.out" },
        0,
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
