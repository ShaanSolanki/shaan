"use client";

import { useEffect, useRef } from "react";
import { Mic, Bot, Workflow, LayoutGrid, Users, WifiOff, Radio, BrainCircuit } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { FlipHeading } from "./FlipHeading";

const CAPS = [
  { icon: Mic, title: "Voice Assistants", line: "Conversational systems with low-latency STT & TTS." },
  { icon: Bot, title: "AI Agents", line: "LLM-driven workflows that reason and act." },
  { icon: Workflow, title: "Automation", line: "Triggers, queues, and reliable background jobs." },
  { icon: LayoutGrid, title: "SaaS Platforms", line: "Scalable products from auth to dashboard." },
  { icon: Users, title: "CRM Systems", line: "Pipelines, contacts, and team workflows." },
  { icon: WifiOff, title: "Offline-first AI", line: "On-device intelligence that syncs on reconnect." },
  { icon: Radio, title: "Real-time Comms", line: "Presence, sockets, and instant sync." },
  { icon: BrainCircuit, title: "LLM Integrations", line: "Models wired into real product surfaces." },
];

/** Pinned horizontal track (mwg_effect033) of focus areas, scrolls left on vertical scroll. */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;
    const ctx = gsap.context(() => {
      const getDistance = () => container.scrollWidth - window.innerWidth;
      gsap.to(container, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
    {/* mobile */}
    <section className="md:hidden px-5 py-20">
      <h2 className="font-Satoshi-Black text-4xl uppercase leading-none mb-8">What I Build</h2>
      <div className="grid grid-cols-1 gap-4">
        {CAPS.map(({ icon: Icon, title, line }) => (
          <div key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] p-5">
            <Icon className="h-7 w-7 text-[var(--accent)] mb-3" strokeWidth={1.5} />
            <h3 className="font-Satoshi-Bold text-xl mb-1">{title}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{line}</p>
          </div>
        ))}
      </div>
    </section>

    <section ref={sectionRef} className="mwg_effect033 hidden md:block">
      <div className="scroll">
        <div className="grid grid-cols-12 gap-5 px-8 mt-32">
          <div className="col-span-7">
            <FlipHeading
              text="What I Build"
              className="font-Satoshi-Black text-6xl lg:text-8xl uppercase leading-none"
            />
          </div>
          <div className="col-start-9 col-span-3 mt-4 text-[var(--muted)]">
            <p className="leading-relaxed">
              Intelligent, automation-driven systems — from voice to real-time to offline-first AI.
            </p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="container">
        <div className="medias">
          {CAPS.map(({ icon: Icon, title, line }) => (
            <div key={title} className="panel">
              <Icon className="h-8 w-8 text-[var(--accent)]" strokeWidth={1.5} />
              <div>
                <h3 className="font-Satoshi-Bold text-2xl lg:text-3xl mb-2">{title}</h3>
                <p className="text-[var(--muted)] leading-relaxed whitespace-normal">{line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
