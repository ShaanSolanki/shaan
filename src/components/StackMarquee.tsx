"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STACK = [
  "React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB",
  "Firebase", "Tailwind CSS", "Framer Motion", "JWT Auth", "REST APIs",
  "Git & GitHub", "VPS", "PM2", "Nginx",
];

function Row({ reverse }: { reverse: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: reverse ? 0 : -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });
      if (reverse) gsap.set(track, { xPercent: -50 });

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction; // 1 down, -1 up
          tween.timeScale((reverse ? -1 : 1) * dir);
        },
      });
      return () => st.kill();
    }, track);
    return () => ctx.revert();
  }, [reverse]);

  const items = [...STACK, ...STACK];
  return (
    <div className="overflow-hidden py-1">
      <div ref={trackRef} className="marquee-track">
        {items.map((s, i) => (
          <span
            key={i}
            className="mx-2 my-1 shrink-0 rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-2 font-Satoshi-Medium text-[var(--ink)] text-sm md:text-base whitespace-nowrap"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StackMarquee() {
  return (
    <section className="py-20 md:py-28 border-y border-[var(--line)] bg-[var(--paper-2)]">
      <div className="px-5 md:px-8 mb-8 font-mono text-xs md:text-sm text-[var(--muted)]">
        03 / Toolkit
      </div>
      <div className="flex flex-col gap-2">
        <Row reverse={false} />
        <Row reverse />
      </div>
    </section>
  );
}
