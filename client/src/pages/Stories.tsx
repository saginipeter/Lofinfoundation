import { useMemo } from "react";
import { Link, useSearch } from "wouter";

import { PageBanner, SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import { StoryCard, StoryFeature } from "@/components/site/cards";
import { Eyebrow, PlaceholderNote, Reveal, Tag } from "@/components/site/primitives";
import { IMAGES, programs, stories } from "@/content/site";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Stories() {
  usePageMeta("/stories");

  // The URL is the single source of truth for the filter, so back/forward and
  // shared links always show the list their address describes.
  const search = useSearch();
  const area = useMemo(
    () => new URLSearchParams(search || "").get("area") ?? "all",
    [search],
  );

  const filtered = useMemo(() => {
    if (area === "all") return stories;
    const selected = programs.find((item) => item.slug === area);
    if (!selected) return stories;
    return stories.filter((story) => story.category === selected.name);
  }, [area]);

  const [feature, ...rest] = filtered;
  const program = area === "all" ? undefined : programs.find((item) => item.slug === area);

  return (
    <SitePage>
      <PageBanner
        eyebrow="Stories"
        title="Reporting from the places we fund"
        intro="Written by staff and partners. Names, places and outcomes on this draft are placeholders — publish nothing about a real person without their consent."
        image={IMAGES.storyPublicSpace}
        alt="Neighbours reviewing public-space plans on a street table"
      />

      <section className="bg-bone">
        <div className="container py-14">
          <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Filter by programme area</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter stories by programme area">
                {[{ slug: "all", name: "All stories" }, ...programs].map((item) => (
                  <Link
                    key={item.slug}
                    href={item.slug === "all" ? "/stories" : `/stories?area=${item.slug}`}
                    aria-current={area === item.slug ? "true" : undefined}
                    className={cn(
                      "border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                      area === item.slug
                        ? "border-spruce bg-spruce text-bone"
                        : "border-border bg-card text-spruce/80 hover:border-spruce hover:text-spruce",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PlaceholderNote>Sample editorial</PlaceholderNote>
              <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-muted-foreground">
                {filtered.length} article{filtered.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {program && (
            <p className="mt-6 text-[1.0625rem] text-spruce/80">
              Showing stories from <span className="font-display">{program.name}</span>.
            </p>
          )}

          {feature ? (
            <div className="mt-12 grid gap-14 lg:grid-cols-[1.15fr_1fr]">
              <Reveal>
                <StoryFeature story={feature} />
              </Reveal>
              <Reveal delay={120} className="flex flex-col">
                {rest.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </Reveal>
            </div>
          ) : (
            <div className="mt-14 border border-dashed border-border bg-card p-10 text-center">
              <Tag>No stories filed under this area yet</Tag>
              <p className="mt-4 text-[0.9375rem] text-spruce/75">
                This filter works as soon as real reporting is added to the content file.
              </p>
              <Link
                href="/stories"
                className="mt-6 inline-block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-terracotta"
              >
                Show all stories
              </Link>
            </div>
          )}
        </div>
      </section>

      <SupportBand
        title="Have a story we should be telling?"
        body="We commission from writers who already know the place. Pitch a place, not a cause."
      />
    </SitePage>
  );
}
