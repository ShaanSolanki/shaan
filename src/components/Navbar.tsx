"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: document.body, start: "top top", toggleActions: "play none none none" },
      });
    }, el);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={ref} className="navbar font-Satoshi-Medium text-sm md:text-base">
      <a href="#top" onClick={(e) => onNav(e, "#top")} className="tracking-tight">
        SHAAN SOLANKI
      </a>
      <div className="flex gap-5 md:gap-8">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => onNav(e, l.href)} className="opacity-90 hover:opacity-60 transition-opacity">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
