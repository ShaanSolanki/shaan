/**
 * Shaan's work. Hosted projects link to their live site; private / unhosted
 * work points to GitHub. Every card has content — no empty cards.
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
  href: string; // live site, or GitHub for private / unhosted work
};

export const projects: Project[] = [
  {
    slug: "cadtech",
    index: "01",
    title: "CADTech",
    year: "2025",
    role: "Full-stack · Business Website",
    tags: ["Next.js", "Responsive UI", "SEO", "CMS"],
    blurb:
      "A polished marketing site for CADTech — clean, fast, and conversion-focused. Responsive layouts, smooth sections, and an SEO-friendly structure that presents the brand and its courses with clarity. Live at cadtech.co.in.",
    href: "https://www.cadtech.co.in/",
  },
  {
    slug: "ecell",
    index: "02",
    title: "E-Cell PRMITR",
    year: "2025",
    role: "Full-stack · Web Platform",
    tags: ["React", "Events", "Team", "Animations"],
    blurb:
      "The official Entrepreneurship Cell platform for PRMIT&R — events, initiatives, and the team behind it, wrapped in a modern animated interface. Built to inform students and showcase the cell's activities. Live at ecell.prmitr.in.",
    href: "https://ecell.prmitr.in/",
  },
  {
    slug: "harmony",
    index: "03",
    title: "Harmony Music",
    year: "2025",
    role: "Frontend · Music App",
    tags: ["React", "Vercel", "Streaming UI", "Responsive"],
    blurb:
      "A sleek music streaming web app — browse, play, and explore tracks in a smooth, responsive interface. A demo product showcasing clean component architecture and playful interaction, deployed on Vercel.",
    href: "https://song-hazel-nu.vercel.app/",
  },
  {
    slug: "flowcrm",
    index: "04",
    title: "FlowCRM",
    year: "2025",
    role: "Product · CRM SaaS",
    tags: ["MERN", "Pipelines", "Role Auth", "Dashboard"],
    blurb:
      "A modern CRM for small teams — pipelines, contacts, and lightweight automations that actually feel good to use. Role-based auth, a clean dashboard, and an event-driven engine. Private build — code on GitHub.",
    href: "https://github.com/ShaanSolanki",
  },
  {
    slug: "whatsflow",
    index: "05",
    title: "WhatsFlow",
    year: "2025",
    role: "Automation · WhatsApp",
    tags: ["Node", "WhatsApp API", "Webhooks", "Queues"],
    blurb:
      "WhatsApp automation that handles conversations at scale — broadcast flows, smart auto-replies, and lead capture wired into the business backend. Reliable queues keep messages flowing. Private build — code on GitHub.",
    href: "https://github.com/ShaanSolanki",
  },
  {
    slug: "dialer",
    index: "06",
    title: "Call Automation",
    year: "2024",
    role: "Automation · Voice",
    tags: ["Telephony", "IVR", "LLM Agents", "Node"],
    blurb:
      "An automated calling system — outbound campaigns, IVR flows, and AI-assisted call handling that books, qualifies, and follows up without manual dialing. Private build — code on GitHub.",
    href: "https://github.com/ShaanSolanki",
  },
];
