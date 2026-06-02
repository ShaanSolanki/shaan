/**
 * Shaan's work. These are tasteful PLACEHOLDERS with the right vibe —
 * swap in the real case studies + links here (this is the only file to edit).
 * Drop matching screenshots in /public/images/work/<slug>.jpg (a gradient
 * fallback renders automatically if the image is missing — see <Cover />).
 */
export type Project = {
  slug: string;
  index: string; // "01"
  title: string;
  year: string;
  role: string;
  tags: string[];
  blurb: string;
  href: string; // real link goes here later
};

export const projects: Project[] = [
  {
    slug: "vox",
    index: "01",
    title: "Vox Assistant",
    year: "2025",
    role: "Full-stack · AI Voice",
    tags: ["Next.js", "STT / TTS", "LLM Agents", "WebRTC"],
    blurb:
      "A real-time voice assistant that listens, reasons, and replies in natural speech. Streaming speech-to-text feeds an LLM agent loop; responses are spoken back with low-latency TTS — hands-free, conversational, and fast.",
    href: "#",
  },
  {
    slug: "flowcrm",
    index: "02",
    title: "FlowCRM",
    year: "2025",
    role: "Product · MERN SaaS",
    tags: ["React", "Node", "MongoDB", "JWT Auth"],
    blurb:
      "A modern CRM for small teams — pipelines, contacts, and automations that actually feel light. Built on the MERN stack with role-based auth, a clean dashboard, and an event-driven automation engine.",
    href: "#",
  },
  {
    slug: "autopilot",
    index: "03",
    title: "Autopilot",
    year: "2024",
    role: "Automation · Workflows",
    tags: ["Node", "Express", "Webhooks", "Queues"],
    blurb:
      "A visual automation builder: chain triggers, conditions, and actions across your tools. A reliable job queue runs workflows in the background, with retries, logs, and real-time run status.",
    href: "#",
  },
  {
    slug: "pulse",
    index: "04",
    title: "Pulse",
    year: "2024",
    role: "Real-time · Collaboration",
    tags: ["Socket.io", "Firebase", "React", "Presence"],
    blurb:
      "A real-time collaboration app — shared cursors, live presence, and instant sync. Built around a low-latency socket layer with optimistic updates so everything feels immediate.",
    href: "#",
  },
  {
    slug: "offline-llm",
    index: "05",
    title: "Edge LLM",
    year: "2024",
    role: "AI · Offline-first",
    tags: ["Local Models", "IndexedDB", "Sync", "TypeScript"],
    blurb:
      "An offline-first AI workspace that keeps working without a network. Models and data live on-device; an intelligent sync layer reconciles changes the moment you reconnect.",
    href: "#",
  },
  {
    slug: "ledger",
    index: "06",
    title: "Ledger UI",
    year: "2023",
    role: "Frontend · Design Systems",
    tags: ["Next.js", "Tailwind", "Framer Motion", "GSAP"],
    blurb:
      "A polished, animation-rich dashboard system — composable components, buttery transitions, and a design language tuned for clarity at scale.",
    href: "#",
  },
];
