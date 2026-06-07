/**
 * Shaan's work — real, hosted projects only. Every card links to a live site.
 * By default each card renders a generated "mini-site" poster (see <Cover />).
 * To use a real screenshot instead, drop it in /public and set `image` to its
 * path, e.g. image: "/images/work/solaroft.jpg".
 */
export type Project = {
  slug: string;
  index: string; // "01"
  title: string;
  year: string;
  role: string;
  tags: string[];
  blurb: string;
  href: string; // live site
  image?: string; // optional real screenshot; omit to use the generated poster
};

export const projects: Project[] = [
  {
    slug: "solaroft",
    index: "01",
    title: "Solaroft",
    year: "2025",
    role: "Full-stack · Business Website",
    tags: ["Next.js", "Firebase", "Responsive UI", "SEO"],
    blurb:
      "A polished, conversion-focused business website — clean layouts, smooth motion, and a fast, SEO-friendly build that presents the brand with clarity. Built with Next.js and Firebase. Live at solaroft.com.",
    href: "https://solaroft.com/",
  },
  {
    slug: "perfume",
    index: "02",
    title: "Perfume Store",
    year: "2025",
    role: "Full-stack · E-commerce",
    tags: ["Next.js", "Firebase", "Cart & Checkout", "Responsive"],
    blurb:
      "A full e-commerce storefront for a perfume brand — product catalog, cart, and a smooth checkout flow wrapped in an elegant, responsive UI. Built with Next.js and deployed on Vercel.",
    href: "https://perfume-e-commerse.vercel.app/",
  },
  {
    slug: "voicera",
    index: "03",
    title: "Voicera",
    year: "2025",
    role: "Product · AI Voice Agents",
    tags: ["Next.js", "AI Agents", "Voice", "Real-Time"],
    blurb:
      "An AI voice-agent platform — create and manage intelligent agents that talk, listen, and act in real time. Built with Next.js and a real-time, AI-driven backend.",
    href: "https://voicera-ten.vercel.app/agents",
  },
  {
    slug: "ecell",
    index: "04",
    title: "E-Cell PRMITR",
    year: "2025",
    role: "Full-stack · Web Platform",
    tags: ["Next.js", "Firebase", "Events", "Animations"],
    blurb:
      "The official Entrepreneurship Cell platform for PRMIT&R — events, initiatives, and the team behind it, wrapped in a modern animated interface. Built to inform students and showcase the cell's activities. Live at ecell.prmitr.in.",
    href: "https://ecell.prmitr.in/",
  },
  {
    slug: "harmony",
    index: "05",
    title: "Harmony Music",
    year: "2025",
    role: "Frontend · Music App",
    tags: ["React", "Vercel", "Streaming UI", "Responsive"],
    blurb:
      "A sleek music streaming web app — browse, play, and explore tracks in a smooth, responsive interface. Clean component architecture and playful interaction, deployed on Vercel.",
    href: "https://song-hazel-nu.vercel.app/",
  },
  {
    slug: "cadtech",
    index: "06",
    title: "CADTech",
    year: "2025",
    role: "Full-stack · Business Website",
    tags: ["Next.js", "Responsive UI", "SEO", "CMS"],
    blurb:
      "A polished marketing site for CADTech — clean, fast, and conversion-focused. Responsive layouts, smooth sections, and an SEO-friendly structure that presents the brand and its courses with clarity. Live at cadtech.co.in.",
    href: "https://www.cadtech.co.in/",
  },
];
