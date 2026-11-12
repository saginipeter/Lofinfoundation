import { org } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * LOFIN lockup: an original arc-and-seed mark beside a two-line, wide-tracked
 * wordmark. The mark is drawn, not an image, so it recolours with the theme.
 */
export function WordmarkMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-hidden className={cn("size-9", className)}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
      <path
        d="M7 25.5c3.6-6.4 8.4-9.6 14.4-9.6 4.4 0 8 1.5 10.6 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.5 30c2.9-4.6 6.4-6.9 10.6-6.9 2.9 0 5.4 1 7.4 3.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="27.4" cy="12.6" r="3" fill="var(--terracotta)" />
    </svg>
  );
}

export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", tone === "dark" ? "text-paper" : "text-paper", className)}>
      <WordmarkMark className="size-8 shrink-0" />
      <span className="leading-none">
        <span className="block text-[1.0625rem] font-semibold tracking-[0.34em] uppercase">
          {org.wordmarkTop}
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.5625rem] font-medium tracking-[0.42em] uppercase",
            tone === "dark" ? "text-paper/60" : "text-paper/65",
          )}
        >
          {org.wordmarkBottom}
        </span>
      </span>
    </span>
  );
}
