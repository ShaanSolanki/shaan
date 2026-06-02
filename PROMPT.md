# Build Prompt — "SHAAN" · a light, animation-first developer portfolio

> Paste this whole file into Claude (or any capable AI coder) as the build brief.
>
> **Read this first.** This is **not a from-scratch guess.** Three working sibling projects on this
> machine already contain every animation and every line of GSAP you need. Open them and copy the
> mechanics verbatim — only the *theme* (dark → **light**) and the *content* (films/songs → **a
> developer's work**) change.
>
> | reference project | path (relative to this folder) | what to steal from it |
> |---|---|---|
> | **movie-clone** | `../../movie-clone/src` | The motion engine. `FlipHeading`, `Reveal`, and the four MWG effects (`033` horizontal track, `018` stacked deck, `003` rotating wheel, `029` word-reveal). Copy the GSAP **exactly** — it is buttery 60fps. |
> | **song / RESONANCE** | `../../song/PROMPT.md` | The gold-standard way to write & ship one of these (section-for-section mirror, click-to-interact cards, ambient glow, graceful fallbacks). |
> | **portfolio/MARA** | `../MARA/idea.md` | The editorial portfolio soul: Lenis inertia scroll, a 0→100 loader that wipes away, opposing marquees, a **tactile project carousel where cards physically rotate/roll on click**, custom cursor, film grain. |
>
> When in doubt about an animation, **open `../../movie-clone/src` and copy what it does.** Do not
> invent a weaker version.

---

## 0. One-line intent

A **minimalist yet rich, light-themed** single-page portfolio for **Shaan Solanki** where the
**animation IS the product**. Warm paper background, ink-black oversized type, one disciplined
electric accent. Everything glides on Lenis inertia. Headings flip up letter-by-letter and flip on
hover; project cards **roll/flip in and out** when you hit "Next Project"; a stacked deck of work
fans out and collapses on scroll; a tech-stack track scrolls horizontally while pinned; a manifesto
reveals word-by-word. Clean, choreographed, never twitchy — "a real engineer with taste built this."

---

## 1. Who this is for (REQUIRED content — this is the real bio, use it)

**Shaan Solanki** — full-stack developer & AI-focused product builder. Builds modern, intelligent,
automation-driven digital experiences. Primary stack: **MERN**. Loves clean UI/UX over powerful
backends, and is deeply into **AI integrations, voice systems, automation workflows, and real-time
apps**.

- **Interests:** AI-powered apps · Voice assistants & conversational systems · Automation tools ·
  SaaS platforms · CRM systems · Modern animated web experiences · Offline-first AI architectures.
- **Exploring:** LLMs · Speech-to-Text & Text-to-Speech · AI agents & workflows · Auth systems ·
  Real-time communication · Scalable backend architectures.
- **Tech stack (render as chips / marquee):** React.js · Next.js · TypeScript · Node.js ·
  Express.js · MongoDB · Firebase · Tailwind CSS · Framer Motion · JWT Auth · REST APIs ·
  Git & GitHub · VPS Deployment · PM2 · Nginx.
- **Driving line (use as a hero/manifesto statement):** *"Building products that feel futuristic,
  useful, and interactive — combining design, AI, and engineering into experiences that solve
  real-world problems."*
- **Ethos:** learning by building ambitious projects; pushing past traditional web dev into
  intelligent systems and next-generation interfaces.

> **Projects:** Shaan will provide real project links + details LATER. For now, build **4–6
> placeholder projects** with real-sounding titles, the right vibe (an AI voice assistant, a SaaS
> CRM, an automation workflow tool, a real-time chat/collab app, an offline-first LLM app), a year,
> a one-line role, a tag list, and a paragraph. Put them all in **one data file**
> (`src/data/projects.ts`) so swapping in the real ones later is a one-file edit. Add a small,
> tasteful "demo content — real case studies coming soon" note near the work section.

---

## 2. The look — LIGHT, matte, rich (decide the exact tokens, here's the brief)

Reverse the movie-clone's pure-black theme into a **warm, premium light** one. Think gallery wall +
editorial print, not "white SaaS landing page."

- **Background:** warm paper / ivory — pick in the `#FAF9F6 → #FFFEFC` range (NOT pure `#FFFFFF`).
- **Ink (text):** near-black charcoal, e.g. `#111110` / `#15140F` — never pure `#000`.
- **Muted:** a warm grey for labels/meta (`~#6B6863`).
- **Hairlines / borders:** low-contrast warm grey (`~#E5E2DA`) instead of the movie-clone's `#606060`.
- **ONE accent with personality** (you choose — commit to it): an **electric cobalt / klein blue**
  (`~#1F32E6`) reads "futuristic AI"; a **deep oxblood** or **ochre** reads "premium editorial".
  Pick one and use it *sparingly* — link fills, hover states, a live status dot, text selection,
  the active project ring, the scroll cue. The richness comes from restraint + great type + motion,
  not from color everywhere.
- **Selection:** `::selection { background: <accent>; color: <paper>; }`.
- **Grain:** a faint film-grain / paper-noise overlay over everything (`opacity ~0.04`, `mix-blend`),
  killed under `prefers-reduced-motion`. This is what makes a flat light page feel *matte and rich*.
- **Soft elevation:** cards get a soft, low, warm shadow (not a hard drop shadow) + a hairline border.
- The `mix-blend-difference` navbar from movie-clone works on light too (it inverts over imagery) —
  keep it, but verify legibility over the paper sections.

> **Type:** self-host a strong pairing (don't lean on system fonts). Either (a) reuse **Satoshi**
> (Black/Bold/Medium/Regular) like movie-clone for a clean grotesque look, or (b) pair a
> **high-contrast display serif** (huge, ultralight, for statements) with a **neo-grotesque sans**
> (labels/UI) and a **mono** face (years, meta, the loader counter). Hero type is the hero:
> `8–12vw`, tight tracking, mixed case. Whichever you choose, set it in `globals.css` exactly like
> movie-clone sets Satoshi.

---

## 3. Tech stack (use this exact stack)

| Concern    | Use |
|------------|-----|
| Framework  | **Next.js 16** (App Router, React 19, TypeScript **strict**, no `any`). ⚠️ Breaking changes vs. your training data — read `node_modules/next/dist/docs/` before writing code. |
| Styling    | **Tailwind CSS v4** with `@theme inline` + oklch/hex tokens — **light theme, no dark mode**. |
| Smooth scroll | **Lenis** synced to ScrollTrigger (this is the MARA upgrade over movie-clone — the whole page glides on inertia). `lenis.on("scroll", ScrollTrigger.update)` + drive `lenis.raf` from `gsap.ticker`. |
| Animation  | **GSAP + ScrollTrigger** — the entire motion system (mirror movie-clone). Framer Motion is in his stack but **GSAP owns the scroll choreography**; use Framer only for small component micro-interactions if you want. |
| Icons      | **lucide-react**. |
| Utils      | `cn()` from `clsx` + `tailwind-merge`. |
| Fonts      | self-hosted `.woff2` (Satoshi, or your chosen serif+grotesk+mono trio). |

```ts
// src/lib/gsap.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
```

> Anything using GSAP/Lenis/hooks is a **Client Component** (`"use client"`). Register ScrollTrigger
> once, guarded by `typeof window !== "undefined"`. Always run GSAP inside `gsap.context()` and
> `ctx.revert()` on cleanup. Mount the Lenis/scroll provider in a client component after hydration.

---

## 4. The reusable motion primitives (copy from movie-clone first)

Build these before any section — they carry the whole site.

### `FlipHeading` — copy `../../movie-clone/src/components/FlipHeading.tsx` verbatim
Splits text → words → letters; each `.char` is an `overflow-hidden` column holding two stacked
copies. On scroll-in, GSAP masks the inner spans up (`yPercent 110 → 0`, `stagger 0.025`,
`duration 0.9`, `power3.out`, `scrollTrigger start "top 85%"`). Add the `flip-heading` class for the
CSS hover-flip. **Use it for the hero, every section title, and the footer.** The CSS:

```css
.char { position: relative; display: inline-flex; flex-direction: column; overflow: hidden; line-height: 1; }
.char > span { display: block; transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1); }
.char > span:nth-child(2) { position: absolute; top: 100%; left: 0; }
.flip-heading:hover .char > span:nth-child(1),
.char.is-flipping > span:nth-child(1) { transform: translateY(-100%); }
.flip-heading:hover .char > span:nth-child(2),
.char.is-flipping > span:nth-child(2) { transform: translateY(-100%); }
```

### `Reveal` — copy `../../movie-clone/src/components/Reveal.tsx` verbatim
Image inside a `clip-path: inset(100% 0 0 0)` mask that wipes up to `inset(0)` (`duration 1`,
`power3.out`) while the inner `<img>` scales `1.3 → 1`, triggered at `top 85%`. Used for every
project screenshot / about photo.

### The four MWG effects — copy the CSS + GSAP from movie-clone, re-skin for light
You already have the exact CSS in `../../song/PROMPT.md §3` and the exact GSAP in
`../../movie-clone/src/components/`. Re-theme borders/colors to the light palette (`#E5E2DA`
hairlines, paper backgrounds, soft shadows, accent ring on active). The GSAP math stays identical:

- **`mwg_effect033`** — pinned **horizontal track**: `gsap.to(container,{ x:()=>-(scrollWidth-innerWidth), ease:"none", scrollTrigger:{ pin:true, scrub:1, start:"top top", end:()=>"+="+distance, invalidateOnRefresh:true }})`.
- **`mwg_effect018`** — **stacked deck** fan→collapse: per-card `set({ xPercent:(center-i)*95, rotate:(i-center)*6, scale:0.92, zIndex })` then `to({ xPercent:0, rotate:0, scale:1, scrub:1 })` over a `300vh` pin.
- **`mwg_effect003`** — **rotating wheel**: position cards on a wide arc (`GAP=14°`, `R=vh*1.45`, pivot `cx=vw/2+vw*0.0625`, `cy=vh/2+R`); `ScrollTrigger.create({ scrub:1, onUpdate/onRefresh: layout(self.progress) })` over `300vh`; cards stay upright.
- **`mwg_effect029`** — **word-by-word reveal**: `gsap.fromTo(words,{opacity:0.15,yPercent:30},{opacity:1,yPercent:0,ease:"none",stagger:0.5,scrollTrigger:{start:"top 70%",end:"bottom bottom",scrub:1}})` with a sticky image beside it.

---

## 5. Page structure & section-by-section spec

`app/page.tsx` composes these in order (wrap everything in the Lenis/`SmoothScroll` provider; the
custom cursor + grain overlay are global):

```tsx
<SmoothScrollProvider>
  <Cursor />            {/* trailing ring, reacts to interactive els (from MARA brief) */}
  <Grain />             {/* fixed film-grain overlay */}
  <Loader />            {/* 0→100 counter, wipes away to reveal hero */}
  <Navbar />            {/* fixed, mix-blend-difference, wordmark "SHAAN SOLANKI" / "SS." */}
  <main>
    <Hero />            {/* FlipHeading name + rotating role words */}
    <Manifesto />       {/* mwg_effect029 word reveal of the driving line */}
    <StackMarquee />    {/* two opposing marquee rows of the tech stack */}
    <FeaturedWork />    {/* ★ the flip/roll "Next Project" carousel — the signature */}
    <WorkDeck />        {/* mwg_effect018 stacked deck of project cards */}
    <Capabilities />    {/* mwg_effect033 horizontal pinned track of interests/AI focus */}
    <About />           {/* Reveal photo + pinned career/era timeline */}
    <Quote />           {/* mwg_effect029 — the ethos line, sticky image beside */}
    <Contact />         {/* copy-email, socials, FlipHeading "LET'S BUILD." */}
  </main>
</SmoothScrollProvider>
```

### §5.1 Loader — ★ a genuinely attractive, unique loading screen (high priority)
This is the **first thing anyone sees — make it unforgettable, not a generic spinner.** It must feel
bespoke to Shaan (developer / AI builder) and flow seamlessly into the hero.
- A **mono counter ticking 0 → 100** is the spine, but dress it richly. Pick a signature concept and
  commit (choose ONE, make it beautiful):
  - **"Compiling" / terminal-poetry:** lines of his identity type out and resolve as the counter
    climbs (e.g. `> initializing…`, `> loading intelligence…`, `> npm run shaan`), the accent caret
    blinking — a developer's loader.
  - **Type-mask build:** the letters of `SHAAN SOLANKI` draw/clip in one by one, the counter filling
    a hairline progress bar beneath them; at 100 the whole wordmark **morphs into the hero wordmark**
    (shared-element handoff — same font, it just settles into place).
  - **Stack-assembling:** the tech-stack words rapidly cycle/stack behind the counter and lock in.
- At **100**, don't just fade: do a **choreographed exit** — a clip-wipe / panel-split / curtain-up
  that *reveals* the hero already sitting behind it, then Lenis starts. The handoff should feel like
  one continuous motion, not two screens.
- Real asset preloading: tie progress to fonts/images actually loading where feasible (don't fake a
  fixed timer if you can help it); keep total feel ~1.2–2s so it impresses without annoying.
- Runs **once per session** (sessionStorage) so navigating back doesn't replay it. Skip instantly and
  show the hero under `prefers-reduced-motion`.

### §5.2 Navbar
Fixed, `mix-blend-difference`, `text-sm md:text-lg opacity-80`. Left: wordmark **`SHAAN SOLANKI`**
(or `SS.`). Right: smooth-scroll links `Work · About · Contact` (keep `pointer-events:auto`). On
scroll past each section, the active link/section label morphs in (MARA's "morphing nav").

### §5.3 Hero
Full-height. `FlipHeading text="SHAAN SOLANKI"` huge (`font-black text-6xl md:text-8xl lg:text-[10vw]
leading-none`). Below it, a **rotating role word** that swaps on a timer with a mask-flip:
*Full-Stack Developer → AI Product Builder → Automation Engineer → Real-Time Systems*. Thin hairline
divider. A 12-col intro grid: left label `01 / Intro`, a short first-person line ("I build
intelligent, automation-driven products with the MERN stack and AI."), and a `(Scroll)` cue (with the
accent dot) hidden on mobile. Imagery (if any) scales in subtly on load.

### §5.4 Manifesto — `mwg_effect029`
The driving line revealed **word-by-word on scrub**: *"Building products that feel futuristic, useful,
and interactive — combining design, AI, and engineering into experiences that solve real-world
problems."* Optionally a sticky abstract image beside it.

### §5.5 StackMarquee
**Two opposing marquee rows** of the tech-stack chips (React, Next.js, TypeScript, Node, Express,
MongoDB, Tailwind, Framer Motion, JWT, REST, Git, VPS, PM2, Nginx). Row directions **flip with scroll
direction** (MARA requirement). Chips = paper pills with hairline border; accent fill on hover.

### §5.6 FeaturedWork — ★ THE SIGNATURE (the "click Next Project → it flips & rolls in" moment)
This is the interaction Shaan specifically asked for. Build a **featured-project stage**: one large
project card centered, with `Prev / Next Project` controls (and number `01 / 06`).
- On **Next**: the current card **rotates out** (3D `rotateY`/`rotateX` flip + a `roll` — translate +
  `rotate` + slight scale-down, easing `power3.inOut`, `~0.7s`) while the incoming card **rolls in**
  from the opposite side (mirror transform → settle to neutral). Use GSAP timelines; give the card
  `transform-style: preserve-3d` and `perspective` on the stage. Think "a card physically swapped on
  a table," exactly the tactile carousel from MARA's brief.
- Each card shows: big project title (FlipHeading-style), year, role, tag chips, a one-paragraph
  blurb, a `Reveal` screenshot, and a `View project ↗` link (placeholder href for now).
- Drag / swipe support on touch; keyboard `←/→`. Active state uses the accent ring.
- Pull data from `src/data/projects.ts`.

### §5.7 WorkDeck — `mwg_effect018`
A **pinned stacked deck** of the same project cards that starts **fanned out** (translated, rotated
`±6°`, scaled `0.92`) and **collapses into a neat centered stack as you scroll** — then the top card
links into FeaturedWork. Mobile (`md:hidden`): horizontal snap carousel (`snap-x snap-mandatory`,
`w-[70vw]`). (This is the "deck" feel from the song site's ClassicsSection, re-skinned light.)

### §5.8 Capabilities — `mwg_effect033`
A **pinned horizontal track** that scrolls left as you scroll down, showcasing Shaan's focus areas as
cards/panels: *AI-powered apps · Voice assistants · Automation tools · SaaS platforms · CRM systems ·
Offline-first AI · Real-time comms · LLMs / STT / TTS*. Overlaid heading block (`.scroll`):
`FlipHeading text="What I Build"` + a short paragraph. Square/portrait panels with an icon
(lucide), title, and one line each.

### §5.9 About
A `Reveal` portrait/abstract image + a first-person bio (warm, specific, his voice — "What drives me
most…"). Beside/below it, a **pinned vertical-to-horizontal timeline** of eras/skills (MERN → AI
integrations → voice & real-time → offline-first), each entry sliding/fading in on its own
ScrollTrigger.

### §5.10 Quote — `mwg_effect029`
The ethos line revealed word-by-word with a sticky image: *"I believe in learning by building
ambitious projects — pushing past traditional web dev into intelligent systems and next-generation
interfaces."*

### §5.11 Contact / Footer
Full-screen, centered. `FlipHeading text="LET'S BUILD."` + a sub-line. A **copy-email affordance**
(click → copies, accent confirmation) and social links (GitHub, etc. — placeholders for now). A faint
slow marquee of the tech stack or "available for work" above it.

---

## 6. Micro-interactions & polish (what separates god-tier from fine)

- **Custom cursor:** a small trailing ring (accent) that grows/changes over interactive elements;
  hidden on touch. Respect reduced-motion.
- **Magnetic buttons/links:** nav links, the email, and the Next/Prev controls subtly pull toward the
  cursor.
- **Parallax:** gentle parallax on imagery and oversized section numbers.
- **Easing discipline:** slow, confident `power3/power4.out`, durations `0.6–1.5s`. Choreographed,
  never twitchy. If a choice trades smoothness for snappiness — **choose smoothness** (match
  movie-clone's 60fps feel).
- **Surprise beats** (Shaan wants "eye-catching surprise animation"): pick 2–3 — e.g. a hero word
  that glitches/scrambles once on load; the loader split-wipe; a section divider that draws itself;
  the deck cards casting moving soft shadows as they collapse.
- **Grain + soft shadows** make the light theme feel matte and expensive — don't skip them.

---

## 7. Quality bar / acceptance

- [ ] **Light, matte, rich** — warm paper bg (not pure white), charcoal ink (not pure black), ONE
      restrained accent, film grain, soft warm shadows. Reads "gallery/editorial," not "SaaS."
- [ ] Motion engine mirrors movie-clone: `FlipHeading` letter-reveal + hover-flip, `Reveal`
      clip-wipes, and all four MWG effects, all buttery at 60fps.
- [ ] **Lenis inertia scroll** synced to ScrollTrigger across the whole page.
- [ ] **Unique, attractive loading screen** (not a generic spinner): a bespoke developer-themed
      0→100 build that does a choreographed clip/split exit handing off seamlessly into the hero; runs
      once per session.
- [ ] **FeaturedWork: clicking "Next Project" flips/rolls the current card out and rolls the next in**
      (3D, tactile, drag + keyboard support). This is the signature — get it right.
- [ ] WorkDeck fans out → collapses on scroll; Capabilities track pins & scrubs horizontally.
- [ ] Manifesto + Quote reveal word-by-word; StackMarquee rows flip with scroll direction.
- [ ] Custom cursor, magnetic buttons, parallax, copy-email — all present and considered.
- [ ] All of **Shaan's real bio/interests/stack** used; **4–6 placeholder projects in
      `src/data/projects.ts`** (one-file swap for the real links he'll send later) + a "demo content"
      note.
- [ ] `prefers-reduced-motion` removes/calms motion and keeps everything usable; responsive
      `390 / 768 / 1440`; no layout shift; no console errors.
- [ ] `npm run check` (lint + typecheck + build) passes; TS strict, no `any`.

Deliver a runnable Next.js app (`npm i && npm run dev`) + a short README that says exactly which file
to edit to drop in Shaan's real projects (`src/data/projects.ts`) and assets
(`public/images/work/`). **When in doubt about any animation, open `../../movie-clone/src` and copy
what it does; when in doubt about how to ship one of these, re-read `../../song/PROMPT.md`.**
