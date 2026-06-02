# SHAAN — animated developer portfolio

Light, animation-first single-page portfolio for **Shaan Solanki** (full-stack & AI product builder).
Built per `PROMPT.md`. Motion engine ported from the sibling `movie-clone` (GSAP + ScrollTrigger),
upgraded with Lenis inertia scroll and an editorial light theme.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + build
```

## What's inside

- **Bespoke loader** — a "compiling" terminal + 0→100 counter that clip-wipes into the hero (once per session).
- **Hero** — name masks up letter-by-letter on the loader handoff; rotating role word.
- **Manifesto / Quote** — word-by-word scrub reveals.
- **StackMarquee** — two opposing tech-stack rows that flip direction with scroll.
- **Selected Work** — the signature: **Next/Prev flips + rolls** each project card in 3D (drag + ←/→ too).
- **WorkDeck** — pinned stacked deck that fans out → collapses on scroll.
- **Capabilities** — pinned horizontal track of focus areas.
- **About** — clip-reveal portrait + animated timeline.
- **Contact** — copy-email + socials, big flip heading.
- Custom cursor, film grain, soft shadows, `prefers-reduced-motion` support.

## Swapping in real content (do this later)

- **Projects:** edit `src/data/projects.ts` — title, year, role, tags, blurb, and the real `href`.
  This is the only file you need to touch for the work section.
- **Project images:** drop `public/images/work/<slug>.jpg` (matching the `slug` in `projects.ts`).
  A tasteful deterministic gradient renders automatically if an image is missing — no broken images.
- **Portrait:** replace the gradient block in `src/components/About.tsx` with your photo.
- **Socials / email:** `src/components/Contact.tsx`.

## Stack

Next.js 16 (App Router, React 19, TS strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis ·
lucide-react · self-hosted Satoshi.
