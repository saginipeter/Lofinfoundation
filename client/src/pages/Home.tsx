import { Link } from "wouter";

import { SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import {
  HeroCarousel,
  ProgramCard,
  QuoteBand,
  StatBlock,
  StoryCard,
  StoryFeature,
} from "@/components/site/cards";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
  SectionHeading,
} from "@/components/site/primitives";
import {
  heroSlides,
  impactStats,
  mission,
  programs,
  quote,
  stories,
} from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta("/");

  const [feature, ...rest] = stories;
  const { flagship } = mission;

  return (
    <SitePage>
      {/* One h1 per page; the hero carries the organisation's positioning. */}
      <h1 className="sr-only">
        LOFIN Foundation — {mission.heading}
      </h1>

      <HeroCarousel slides={heroSlides} />

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="bg-bone">
        <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <Reveal>
            <Eyebrow>{mission.eyebrow}</Eyebrow>
            <h2 id="mission-heading" className="mt-4 text-[2rem] leading-[1.12] sm:text-[2.6rem]">
              {mission.heading}
            </h2>
            <Prose className="mt-6">
              {mission.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Prose>
            <div className="mt-9 flex flex-wrap gap-3">
              <EditorialButton href="/donate" tone="solid">
                Donate
              </EditorialButton>
              <EditorialButton href="/get-involved" tone="outline">
                Get involved
              </EditorialButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="overflow-hidden bg-spruce-deep">
              <img
                src={mission.image}
                alt={mission.imageAlt}
                className="aspect-[4/3] size-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[240px] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:block">
              <p className="font-display text-3xl leading-none text-terracotta">
                {programs.length}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-snug text-spruce/85">
                programme areas, one defined geography
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section aria-labelledby="programs-heading" className="border-y border-border bg-bone-deep">
        <div className="container py-20 lg:py-24">
          <SectionHeading id="programs-heading">Our Work</SectionHeading>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[1.0625rem] leading-relaxed text-spruce/80">
            Four programme areas, chosen because a small patient grant in each one changes what a
            community can do for itself.
          </p>
          <ul className="mt-14 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => (
              <li key={program.slug}>
                <Reveal delay={index * 90}>
                  <ProgramCard program={program} index={index} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact band */}
      <section aria-labelledby="investment-heading" className="bg-bone">
        <div className="container py-20 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>What we can show you</Eyebrow>
              <h2 id="investment-heading" className="mt-3 text-3xl sm:text-4xl">
                Investment to date
              </h2>
            </div>
            <PlaceholderNote>Illustrative figures — replace with your own data</PlaceholderNote>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <StatBlock stat={stat} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <EditorialButton href="/impact" tone="outline">
              See how we measure it
            </EditorialButton>
          </div>
        </div>
      </section>

      {/* Recent stories: one feature left, compact rows right (reference layout) */}
      <section aria-labelledby="stories-heading" className="border-y border-border bg-bone-deep">
        <div className="container py-20 lg:py-24">
          <SectionHeading id="stories-heading">Recent Stories</SectionHeading>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Reveal>
              <StoryFeature story={feature} />
            </Reveal>
            <Reveal delay={120}>
              {rest.slice(0, 4).map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
              <Link
                href="/stories"
                className="mt-8 inline-flex items-center gap-2 border-b border-spruce/30 pb-1 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-spruce hover:border-terracotta hover:text-terracotta"
              >
                All stories
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow={quote.eyebrow}
        text={quote.text}
        attribution={quote.attribution}
      />

      {/* Flagship initiative strip */}
      <section aria-labelledby="flagship-heading" className="bg-bone">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="order-2 overflow-hidden bg-spruce-deep lg:order-1">
            <img
              src={flagship.image}
              alt={flagship.alt}
              className="aspect-[3/2] size-full object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <Eyebrow>{flagship.eyebrow}</Eyebrow>
            <h2 id="flagship-heading" className="mt-4 text-[1.9rem] leading-tight sm:text-[2.4rem]">
              {flagship.heading}
            </h2>
            <Prose className="mt-5">
              <p>{flagship.body}</p>
            </Prose>
            <div className="mt-8">
              <EditorialButton href={flagship.href} tone="solid">
                {flagship.ctaLabel}
              </EditorialButton>
            </div>
          </Reveal>
        </div>
      </section>

      <SupportBand />
    </SitePage>
  );
}
