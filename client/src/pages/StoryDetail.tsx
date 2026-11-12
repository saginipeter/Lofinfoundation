import { Link, useParams } from "wouter";

import SitePage from "@/components/site/SitePage";
import { StoryCard } from "@/components/site/cards";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
  Tag,
} from "@/components/site/primitives";
import { getStory, org, stories } from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "./NotFound";

function readingMinutes(paragraphs: string[]) {
  const words = paragraphs.join(" ").trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 180));
}

export default function StoryDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const story = getStory(slug);

  usePageMeta(
    story ? `/stories/${story.slug}` : "/stories",
    story
      ? {
          title: `${story.title} | ${org.name}`,
          description: story.summary,
        }
      : undefined,
  );

  if (!story) return <NotFound />;

  const related = stories.filter((item) => item.slug !== story.slug).slice(0, 4);

  return (
    <SitePage>
      <article>
        <header className="relative isolate overflow-hidden bg-navy-deep">
          <img
            src={story.image}
            alt={story.alt}
            className="absolute inset-0 size-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20"
            aria-hidden
          />
          <div className="container relative flex min-h-[56vh] flex-col justify-end pb-16 pt-24">
            <Reveal className="max-w-3xl">
              <Link
                href={story.categoryHref}
                className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold hover:text-paper"
              >
                {story.category}
              </Link>
              <h1 className="mt-5 text-[2.1rem] leading-[1.08] text-paper sm:text-[3rem]">
                {story.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-paper/85">
                {story.standfirst}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] uppercase tracking-[0.12em] text-paper/70">
                <span>{story.author}</span>
                <span aria-hidden>&middot;</span>
                <time dateTime={story.date}>{story.dateLabel}</time>
                <span aria-hidden>&middot;</span>
                <span>{`${readingMinutes(story.body)} min read`}</span>
              </div>
            </Reveal>
          </div>
        </header>

        <section className="bg-navy">
          <div className="container grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <Prose className="text-[1.09375rem]">
                {story.body.map((paragraph, index) => (
                  <p key={`${story.slug}-p${index}`}>{paragraph}</p>
                ))}
                <blockquote className="border-l-2 border-terracotta pl-6 font-display text-[1.4rem] italic leading-snug text-paper">
                  {story.pullQuote}
                </blockquote>
                <p className="text-[0.9375rem] text-paper/75">
                  Placeholder editorial. Published reporting would name the funded partner, quote
                  residents with written consent, credit a real photographer and link the grant
                  record.
                </p>
              </Prose>
            </Reveal>

            <Reveal delay={120} className="space-y-8">
              <aside className="border border-border bg-card p-6">
                <Eyebrow>About this story</Eyebrow>
                <dl className="mt-4 space-y-4 text-[0.9375rem]">
                  <div className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-muted-foreground">Filed under</dt>
                    <dd className="text-paper">{story.category}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-muted-foreground">Published</dt>
                    <dd className="text-paper">{story.dateLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Byline</dt>
                    <dd className="text-paper">{story.author}</dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <PlaceholderNote>Placeholder byline and date</PlaceholderNote>
                </div>
              </aside>

              <div className="bg-navy-raise p-6">
                <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-paper">
                  Check the money
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/85">
                  {org.name} publishes the grant reference behind every story so a reader can verify
                  the narrative.
                </p>
                <div className="mt-5">
                  <EditorialButton href="/impact" tone="outline">
                    See the figures
                  </EditorialButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border bg-navy-raise">
          <div className="container py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl">More from {org.name}</h2>
              <Link
                href="/stories"
                className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-paper hover:text-terracotta"
              >
                All stories
              </Link>
            </div>
            <div className="mt-8 grid gap-x-10 gap-y-2 md:grid-cols-2">
              {related.map((item) => (
                <StoryCard key={item.slug} story={item} />
              ))}
            </div>
            <div className="mt-10">
              <Tag>Generated imagery. Swap for your own photography before launch</Tag>
            </div>
          </div>
        </section>
      </article>
    </SitePage>
  );
}
