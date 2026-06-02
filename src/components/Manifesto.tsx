import { WordReveal } from "./WordReveal";

export function Manifesto() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <WordReveal
        eyebrow="02 / Approach"
        text="Building products that feel futuristic, useful, and interactive — combining design, AI, and engineering into experiences that solve real-world problems."
        className="text-4xl md:text-6xl lg:text-7xl"
      />
    </section>
  );
}
