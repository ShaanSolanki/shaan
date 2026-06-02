"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Trailing ring + dot that grows over interactive elements. Desktop-only. */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const grow = () => gsap.to(ring, { scale: 1.9, opacity: 0.6, duration: 0.3 });
    const shrink = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    const interactive = () =>
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    interactive().forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive().forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
