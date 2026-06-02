"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { StackMarquee } from "@/components/StackMarquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { WorkDeck } from "@/components/WorkDeck";
import { Capabilities } from "@/components/Capabilities";
import { About } from "@/components/About";
import { Quote } from "@/components/Quote";
import { Contact } from "@/components/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Cursor />
      <Grain />
      <Loader onComplete={() => setReady(true)} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <StackMarquee />
        <FeaturedWork />
        <WorkDeck />
        <Capabilities />
        <About />
        <Quote />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
