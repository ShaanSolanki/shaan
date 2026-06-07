"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FlipHeading } from "./FlipHeading";

const TIMELINE = [
  { k: "Foundations", v: "Next.js & React with Firebase and Node. Clean UI over solid, real-time backends." },
  { k: "AI Integrations", v: "LLMs, agents, and AI woven into real product surfaces." },
  { k: "Voice & Real-time", v: "Speech-to-text, text-to-speech, sockets, and live presence." },
  { k: "Offline-first AI", v: "On-device intelligence and scalable, resilient architectures." },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // portrait clip-reveal
      gsap.fromTo(
        ".about-portrait",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-portrait", start: "top 85%" },
        },
      );
      // timeline rows
      gsap.from(".tl-row", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".tl-list", start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="px-5 md:px-8 py-24 md:py-32">
      <div className="flex items-end justify-between mb-14">
        <FlipHeading text="About" className="font-Satoshi-Black uppercase text-5xl md:text-7xl leading-none" />
        <span className="font-mono text-sm text-[var(--muted)]">05 / Profile</span>
      </div>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div
            className="about-portrait aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[var(--line)] relative"
            style={{ background: "linear-gradient(150deg,#e9e4d8,#cfd6ea 55%,#dfe9e0)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,#fff,transparent_60%)] opacity-60" />
            <div className="absolute bottom-0 p-6 font-mono text-xs text-[var(--muted)]">
              [ portrait — swap in /public/images/work/me.jpg ]
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            I&rsquo;m Shaan Solanki — a full-stack developer and AI-focused product builder. I work
            primarily with Next.js and Firebase, and love combining clean UI/UX with powerful backends.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mb-12 max-w-xl">
            What drives me most is building products that feel futuristic, useful, and interactive. I
            learn by building ambitious projects — constantly pushing past traditional web dev into
            intelligent systems and next-generation interfaces.
          </p>

          <div className="tl-list border-t border-[var(--line)]">
            {TIMELINE.map((t) => (
              <div key={t.k} className="tl-row grid grid-cols-12 gap-4 py-6 border-b border-[var(--line)]">
                <div className="col-span-4 font-Satoshi-Bold">{t.k}</div>
                <div className="col-span-8 text-[var(--muted)] leading-relaxed">{t.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
