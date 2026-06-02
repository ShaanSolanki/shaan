"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** hash a slug → two stable hues for a deterministic gradient fallback */
function hues(slug: string): [number, number] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return [h % 360, (h % 360) + 38];
}

interface CoverProps {
  slug: string;
  title: string;
  className?: string;
  /** label shown over the gradient fallback */
  showLabel?: boolean;
}

/**
 * Project cover. Tries /images/work/<slug>.jpg; if missing, paints a tasteful
 * deterministic gradient + the title so there is never a broken image.
 */
export function Cover({ slug, title, className, showLabel = true }: CoverProps) {
  const [failed, setFailed] = useState(false);
  const [a, b] = hues(slug);

  if (failed) {
    return (
      <div
        className={cn("relative h-full w-full", className)}
        style={{
          background: `linear-gradient(135deg, hsl(${a} 42% 86%), hsl(${b} 38% 74%))`,
        }}
      >
        <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_55%)]" />
        {showLabel && (
          <div className="cover-fallback">
            <span className="font-Satoshi-Bold text-[var(--ink)] text-lg md:text-2xl leading-tight">
              {title}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/work/${slug}.jpg`}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
