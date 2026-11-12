import { Link, useParams } from "wouter";

import { PageBanner, SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import { StoryFeature } from "@/components/site/cards";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
} from "@/components/site/primitives";
import { getProgram, getStory } from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "./NotFound";

export default function ProgramDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const program = getProgram(slug);

  usePageMeta(
    program ? `/our-work/${program.slug}` : "/our-work",
    program
      ? {
          title: `${program.name} — Our Work — LOFIN Foundation`,
          description: program.summary,
        }
      : undefined,
  );

  if (!program) return <NotFound />;

  const story = getStory(program.relatedStory);

  return (
    <SitePage>
      <PageBanner
        eyebrow="Our work"
        title={program.name}
        intro={program.tagline}
        image={program.image}
        alt={program.alt}
      />

      <section className="bg-bone">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Eyebrow>The change we are buying</Eyebrow>
            <Prose className="mt-5">
              <p>{program.summary}</p>
              <p>{program.detail}</p>
            </Prose>

            <div className="mt-12 space-y-8">
              {program.focus.map((item, index) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[80px_1fr]"
                >
                  <span className="font-display text-2xl text-terracotta">0{index + 1}</span>
                  <div>
                    <h2 className="text-[1.1875rem] leading-snug">{item.title}</h2>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-10">
            <div className="grid grid-cols-2 gap-6">
              {program.figures.map((figure) => (
                <div key={figure.label} className="border-t-2 border-spruce pt-4">
                  <p className="font-display text-[2.25rem] leading-none text-spruce">
                    {figure.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {figure.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-spruce">
                  Sample grants
                </h2>
                <PlaceholderNote>Placeholder amounts</PlaceholderNote>
              </div>
              <ul className="mt-5 space-y-5">
                {program.grants.map((grant) => (
                  <li key={grant.recipient} className="border-t border-border pt-5 first:border-0 first:pt-0">
                    <p className="font-display text-[1.0625rem] leading-snug">{grant.recipient}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {grant.purpose}
                    </p>
                    <p className="mt-2 text-[0.8125rem] font-bold tracking-wide text-terracotta">
                      {grant.amount}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bone-deep p-6">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-spruce">
                Apply or ask
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/85">
                We read every enquiry in writing before asking for a proposal. Tell us the problem
                and the place.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <EditorialButton href={`/contact?topic=${encodeURIComponent("Grant application")}`} tone="solid">
                  Send an enquiry
                </EditorialButton>
                <EditorialButton href="/donate" tone="outline">
                  Fund this area
                </EditorialButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {story && (
        <section className="border-t border-border bg-bone-deep">
          <div className="container py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Eyebrow>From this program</Eyebrow>
              <Link
                href="/stories"
                className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-spruce hover:text-terracotta"
              >
                All stories
              </Link>
            </div>
            <div className="mt-8 max-w-3xl">
              <Reveal>
                <StoryFeature story={story} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <SupportBand
        title={`Back ${program.name.toLowerCase()}`}
        body="A single gift can be pointed at one of these four areas, or left to the program team to place where the need is sharpest."
      />
    </SitePage>
  );
}
