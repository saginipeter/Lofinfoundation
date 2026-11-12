import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Scroll to an element id, retrying for a moment while a just-mounted page
 * renders. Wouter's Link handles navigation without firing hashchange, so
 * anchor links need this helper rather than relying on the browser.
 */
export function scrollToId(id: string, maxFrames = 30) {
  let frame = 0;

  const step = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Keep the target clear of the sticky header.
      window.setTimeout(() => {
        const offset = element.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }, 520);
      return true;
    }
    if (frame++ < maxFrames) requestAnimationFrame(step);
    return false;
  };

  requestAnimationFrame(step);
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

/** Fade-and-rise on first entry into the viewport. Static under reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

/** Animated figure. Counts from zero when observed; static under reduced motion. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(() => formatNumber(0, decimals, prefix, suffix));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const finish = () => setDisplay(formatNumber(value, decimals, prefix, suffix));

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      finish();
      return;
    }

    let frame = 0;
    let start = 0;

    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatNumber(value * eased, decimals, prefix, suffix));
      if (progress < 1) frame = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(run);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

function formatNumber(n: number, decimals: number, prefix: string, suffix: string) {
  const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
  return `${prefix}${fixed}${suffix}`;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-terracotta", className)}>{children}</p>;
}

/** Centred heading with flanking hairlines, as on the reference site. */
export function SectionHeading({
  children,
  align = "center",
  className,
  id,
  tone = "dark",
}: {
  children: ReactNode;
  align?: "center" | "left";
  className?: string;
  id?: string;
  tone?: "dark" | "light";
}) {
  if (align === "left") {
    return (
      <div className={cn("border-t pt-4", tone === "dark" ? "border-border" : "border-bone/25", className)}>
        <h2 id={id} className={cn("text-3xl sm:text-4xl", tone === "light" && "text-bone")}>
          {children}
        </h2>
      </div>
    );
  }
  return (
    <div className={cn("rule-heading", tone === "light" && "rule-heading-light", className)}>
      <h2 id={id} className={cn("text-center text-3xl sm:text-[2.5rem]", tone === "light" && "text-bone")}>
        {children}
      </h2>
    </div>
  );
}

/**
 * Editorial call-to-action. Solid tone uses the darker terracotta so the
 * uppercase label keeps a readable contrast ratio.
 */
export function EditorialButton({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "solid" | "outline";
  className?: string;
}) {
  const [path, hash] = splitHref(href);
  const internal = path.startsWith("/");

  const classes = cn(
    "group inline-flex items-center gap-2 px-6 py-3 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition-colors",
    tone === "light" && "border border-bone/70 text-bone hover:bg-bone hover:text-spruce-deep",
    tone === "solid" && "bg-terracotta-deep text-white hover:bg-spruce",
    tone === "outline" &&
      "border border-spruce/40 text-spruce hover:border-spruce hover:bg-spruce hover:text-bone",
    className,
  );

  const content = (
    <>
      {children}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
    </>
  );

  if (internal) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={() => {
          if (hash) scrollToId(hash);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

function splitHref(href: string): [string, string | null] {
  const index = href.indexOf("#");
  if (index === -1) return [href, null];
  return [href.slice(0, index), href.slice(index + 1) || null];
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-sage",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-terracotta" aria-hidden />
      {children}
    </span>
  );
}

/** Small honest marker so stakeholders can tell sample content from real content. */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-dashed border-gold/80 bg-gold/12 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-spruce">
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </span>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-5 text-[1.0625rem] leading-[1.75] text-spruce/90", className)}>
      {children}
    </div>
  );
}

/** Keyboard skip link, revealed on focus. */
export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(event) => {
        event.preventDefault();
        scrollToId("main");
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-spruce focus:px-5 focus:py-3 focus:text-[0.75rem] focus:font-bold focus:uppercase focus:tracking-[0.16em] focus:text-bone"
    >
      Skip to content
    </a>
  );
}

export { prefersReducedMotion };
