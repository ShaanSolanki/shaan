"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, Phone } from "lucide-react";
import { FlipHeading } from "./FlipHeading";

const EMAIL = "shaansolanki17@gmail.com";

const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com/ShaanSolanki" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/feed/" },
  { label: "Call", icon: Phone, href: "tel:+919021606508" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <footer id="contact" className="min-h-screen flex flex-col justify-center px-5 md:px-8 py-24">
      <div className="font-mono text-sm text-[var(--muted)] mb-8">07 / Contact</div>

      <FlipHeading
        text="LET'S BUILD."
        className="font-Satoshi-Black uppercase leading-none text-[16vw] md:text-[12vw] lg:text-[10vw]"
      />

      <p className="text-xl md:text-2xl text-[var(--muted)] max-w-xl mt-8 mb-12 leading-relaxed">
        Have a futuristic, AI-driven, or real-time idea? I&rsquo;d love to help build it into
        something people actually use.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-16">
        <button
          onClick={copy}
          className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] text-[var(--paper)] px-6 py-4 font-Satoshi-Bold"
          data-cursor
        >
          {copied ? <Check className="h-5 w-5 text-[var(--accent)]" /> : <Copy className="h-5 w-5" />}
          {copied ? "Copied!" : EMAIL}
        </button>
        <div className="flex gap-3">
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col md:flex-row justify-between gap-4 border-t border-[var(--line)] pt-8 font-mono text-xs text-[var(--muted)]">
        <span>© {new Date().getFullYear()} Shaan Solanki</span>
        <span>Built with Next.js · GSAP · Lenis</span>
        <span>Full-stack &amp; AI product builder</span>
      </div>
    </footer>
  );
}
