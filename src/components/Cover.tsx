"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** hash a slug → two stable hues for a deterministic gradient theme */
function hues(slug: string): [number, number] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return [h % 360, (h % 360) + 38];
}

/** turn a full href into a short display domain for the mock browser bar */
function domainOf(href?: string): string {
  if (!href || href === "#") return "shaansolanki.dev";
  return href
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

interface CoverProps {
  slug: string;
  title: string;
  className?: string;
  /** real link — used to render the mock browser URL bar */
  href?: string;
  /** small label above the title (e.g. the project role) */
  kicker?: string;
  /** tag chips shown on the poster */
  tags?: string[];
  /** optional real screenshot path; when omitted the mock poster is rendered */
  image?: string;
  /** kept for API compat; the rich mock always renders its own label now */
  showLabel?: boolean;
}

/**
 * Project cover. When a real screenshot (`image`) is provided it renders that;
 * otherwise — or if the image fails to load — it paints a tasteful, deterministic
 * "mini-site" poster (a mock browser frame with the project's domain, title, and
 * tags) so a card is never empty, broken, or firing 404s for missing files.
 */
export function Cover({ slug, title, className, href, kicker, tags, image }: CoverProps) {
  const [failed, setFailed] = useState(false);
  const [a, b] = hues(slug);

  if (!image || failed) {
    return (
      <div
        className={cn("cover-mock", className)}
        style={{
          background: `linear-gradient(150deg, hsl(${a} 46% 90%), hsl(${b} 40% 78%) 70%, hsl(${a} 30% 70%))`,
        }}
      >
        <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-[radial-gradient(circle_at_30%_18%,#fff,transparent_55%)]" />

        {/* mock browser chrome */}
        <div className="bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="url">{domainOf(href)}</span>
        </div>

        {/* poster body */}
        <div className="body">
          {kicker && <div className="kicker">{kicker}</div>}
          <div className="title font-Satoshi-Black">{title}</div>
          {tags && tags.length > 0 && (
            <div className="tags">
              {tags.slice(0, 3).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
