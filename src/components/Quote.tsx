import { WordReveal } from "./WordReveal";

export function Quote() {
  return (
    <section className="min-h-[80vh] flex items-center bg-[var(--paper-2)] border-y border-[var(--line)]">
      <WordReveal
        eyebrow="06 / Ethos"
        text="I believe in learning by building ambitious projects — pushing past traditional web development into intelligent systems and next-generation interfaces."
        className="text-3xl md:text-5xl lg:text-6xl"
      />
    </section>
  );
}
