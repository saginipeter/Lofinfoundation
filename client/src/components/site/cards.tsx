import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

import type { HeroSlide, Program, Stat, Story } from "@/content/site";
import { cn } from "@/lib/utils";
import { CountUp, EditorialButton, Eyebrow, Tag } from "./primitives";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    setReduce(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

const AUTOPLAY_MS = 6000;

/**
 * Full-bleed hero carousel in the reference layout: photograph with the
 * headline in a dark scrim panel. Hover, focus-within, a hidden tab and the
 * explicit pause control all stop rotation; reduced motion shows one static
 * slide with no timers.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const go = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  const rotating = !reduceMotion && !hovered && !focused && !tabHidden && !userPaused;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, index, go]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      aria-label="Featured work"
      className="relative isolate overflow-hidden bg-spruce-deep"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <h2 className="sr-only">Featured work</h2>

      <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="size-full" inert={!active && !reduceMotion ? true : undefined}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={cn(
                    "size-full object-cover",
                    active && !reduceMotion && "animate-ken-burns",
                  )}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-spruce-deep/95 via-spruce-deep/55 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-end sm:items-center">
                  <div className="container">
                    <div className="max-w-xl sm:ml-auto sm:pr-4 lg:max-w-2xl">
                      <p className="eyebrow text-gold">{slide.kicker}</p>
                      <h3 className="mt-3 text-[2rem] leading-[1.06] text-bone sm:text-4xl lg:text-[3rem]">
                        {slide.headline}
                      </h3>
                      <p className="mt-5 text-[0.9375rem] leading-relaxed text-bone/85 sm:text-[1.0625rem]">
                        {slide.standfirst}
                      </p>
                      <div className="mt-8">
                        <EditorialButton href={slide.href} tone="light">
                          {slide.ctaLabel}
                        </EditorialButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-bone/15 bg-spruce-deep/70 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="flex gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show slide ${slideIndex + 1} of ${slides.length}: ${slide.kicker}`}
                aria-current={slideIndex === index}
                onClick={() => go(slideIndex)}
                className={cn(
                  "h-1 w-10 transition-colors",
                  slideIndex === index ? "bg-gold" : "bg-bone/30 hover:bg-bone/60",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-pressed={userPaused}
                aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
                className="border border-bone/30 p-2 text-bone/80 transition-colors hover:border-gold hover:text-gold"
              >
                {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className="border border-bone/30 p-2 text-bone/80 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className="border border-bone/30 p-2 text-bone/80 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <Link
      href={`/our-work/${program.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        index % 2 === 1 && "lg:mt-10",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-spruce-deep">
        <img
          src={program.image}
          alt={program.alt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-bone/90 px-2.5 py-1 font-display text-xs tracking-widest text-spruce">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.375rem] leading-tight">{program.name}</h3>
        <p className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-sage">
          {program.tagline}
        </p>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-spruce/85">{program.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-terracotta">
          Explore programme
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Large editorial feature used as the left column of the stories grid. */
export function StoryFeature({ story }: { story: Story }) {
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block overflow-hidden bg-spruce-deep">
        <img
          src={story.image}
          alt={story.alt}
          loading="lazy"
          className="aspect-[3/2] size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="mt-5">
        <Tag>{story.category}</Tag>
        <h3 className="mt-3 text-2xl leading-tight sm:text-[1.75rem]">
          <Link href={`/stories/${story.slug}`} className="hover:text-terracotta">
            {story.title}
          </Link>
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/85">{story.summary}</p>
        <p className="mt-4 text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
          {story.author} · {story.dateLabel}
        </p>
      </div>
    </article>
  );
}

/** Compact story row used in the right-hand column of the reference layout. */
export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group grid grid-cols-[112px_1fr] gap-4 border-t border-border py-5 first:border-t-0 first:pt-0 sm:grid-cols-[140px_1fr] sm:gap-5">
      <Link href={`/stories/${story.slug}`} className="block overflow-hidden bg-spruce-deep">
        <img
          src={story.image}
          alt={story.alt}
          loading="lazy"
          className="aspect-[3/2] size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div>
        <h3 className="font-display text-[1.0625rem] leading-snug">
          <Link href={`/stories/${story.slug}`} className="hover:text-terracotta">
            {story.title}
          </Link>
        </h3>
        <div className="mt-2">
          <Tag className="text-[0.625rem]">{story.category}</Tag>
        </div>
        <p className="mt-2 text-[0.75rem] uppercase tracking-[0.12em] text-muted-foreground">
          {story.author} · {story.dateLabel}
        </p>
      </div>
    </article>
  );
}

export function StatBlock({ stat }: { stat: Stat }) {
  return (
    <div className="border-t-2 border-terracotta pt-5">
      <p className="font-display text-[2.75rem] leading-none text-spruce sm:text-[3.25rem]">
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
      </p>
      <p className="mt-3 text-[0.9375rem] font-medium text-spruce">{stat.label}</p>
      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{stat.note}</p>
    </div>
  );
}

export function QuoteBand({
  eyebrow,
  text,
  attribution,
}: {
  eyebrow: string;
  text: string;
  attribution: string;
}) {
  return (
    <section className="bg-spruce-deep py-20 text-bone sm:py-24">
      <div className="container max-w-4xl text-center">
        <Eyebrow className="text-gold">{eyebrow}</Eyebrow>
        <blockquote className="mt-6 font-display text-[1.6rem] italic leading-[1.35] sm:text-[2.15rem]">
          &ldquo;{text}&rdquo;
        </blockquote>
        <p className="mt-6 text-[0.75rem] uppercase tracking-[0.2em] text-bone/65">{attribution}</p>
      </div>
    </section>
  );
}
