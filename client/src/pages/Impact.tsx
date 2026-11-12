import { PageBanner } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import { StatBlock } from "@/components/site/cards";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
  SectionHeading,
} from "@/components/site/primitives";
import {
  IMAGES,
  allocation,
  impactStats,
  methods,
  outcomes,
  programs,
} from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Impact() {
  usePageMeta("/impact");

  return (
    <SitePage>
      <PageBanner
        eyebrow="Impact"
        title="What we can prove, and what we cannot yet"
        intro="Every figure on this page is illustrative sample data. The structure is what matters: totals, allocation, outcomes against baseline, and the method behind each number."
        image={IMAGES.storyFarming}
        alt="A Kenyan smallholder farmer kneeling in onion rows in the highlands"
      />

      <section aria-labelledby="totals-heading" className="bg-navy">
        <div className="container py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Investment</Eyebrow>
              <h2 id="totals-heading" className="mt-3 text-3xl sm:text-4xl">
                Totals since the first grant
              </h2>
            </div>
            <PlaceholderNote>Illustrative data, not real</PlaceholderNote>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <StatBlock stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Allocation */}
      <section aria-labelledby="allocation-heading" className="border-y border-border bg-navy-raise">
        <div className="container grid gap-14 py-20 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <Eyebrow>Where the money went</Eyebrow>
            <h2 id="allocation-heading" className="mt-4 text-[1.9rem] leading-tight sm:text-[2.25rem]">
              Split by programme area
            </h2>
            <Prose className="mt-5">
              <p>
                Shares of the placeholder total above. A real version of this chart is the single
                fastest way to earn a reader's trust, so it is worth the effort of producing honest
                numbers early rather than a confident-looking guess.
              </p>
            </Prose>
            <div className="mt-8">
              <EditorialButton href="/about#leadership" tone="outline">
                Who signs off the figures
              </EditorialButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-7">
            {allocation.map((item) => {
              const program = programs.find((p) => p.slug === item.slug);
              return (
                <div key={item.slug}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[1.0625rem]">{program?.name ?? item.slug}</h3>
                    <span className="font-display text-xl tabular-nums text-paper">
                      {item.share}%
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 w-full overflow-hidden bg-navy">
                    <div
                      className="h-full bg-gold transition-[width] duration-1000"
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-muted-foreground">{program?.tagline}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Outcomes against baseline */}
      <section aria-labelledby="outcomes-heading" className="bg-navy">
        <div className="container py-20">
          <SectionHeading align="left" id="outcomes-heading">
            Outcomes against baseline
          </SectionHeading>
          <table className="mt-10 w-full border-collapse border border-border bg-card text-left">
            <caption className="sr-only">
              Placeholder outcome indicators with baseline and latest values
            </caption>
            <thead>
              <tr className="border-b border-border bg-navy-raise">
                <th scope="col" className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-paper">
                  Indicator
                </th>
                <th scope="col" className="px-6 py-4 text-right text-[0.7rem] font-bold uppercase tracking-[0.18em] text-paper">
                  Baseline
                </th>
                <th scope="col" className="px-6 py-4 text-right text-[0.7rem] font-bold uppercase tracking-[0.18em] text-paper">
                  Latest
                </th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((outcome) => (
                <tr key={outcome.title} className="border-b border-border last:border-0">
                  <th scope="row" className="px-6 py-6 text-left align-top font-normal">
                    <span className="block text-[1.0625rem] leading-snug text-paper">
                      {outcome.title}
                    </span>
                    <span className="mt-2 block text-[0.875rem] leading-relaxed text-paper/70">
                      {outcome.detail}
                    </span>
                  </th>
                  <td className="px-6 py-6 text-right align-middle font-display text-xl text-muted-foreground md:text-2xl">
                    {outcome.baseline}
                  </td>
                  <td className="px-6 py-6 text-right align-middle font-display text-xl text-terracotta md:text-2xl">
                    {outcome.current}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[0.8125rem] text-muted-foreground">
            Both columns are illustrative. Real reporting names the source, the year and who
            collected it.
          </p>
        </div>
      </section>

      {/* Method */}
      <section aria-labelledby="method-heading" className="border-t border-border bg-navy-deep text-paper">
        <div className="container py-20">
          <Eyebrow className="text-gold">Method &amp; transparency</Eyebrow>
          <h2 id="method-heading" className="mt-4 max-w-3xl text-3xl text-paper sm:text-4xl">
            A number without a method is decoration
          </h2>
          <ul className="mt-12 grid list-none gap-8 p-0 md:grid-cols-3">
            {methods.map((method, index) => (
              <li key={method.title}>
                <Reveal delay={index * 90}>
                  <div className="border-t-2 border-gold pt-5">
                    <h3 className="text-[1.125rem] leading-snug text-paper">{method.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/75">
                      {method.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-14 flex flex-wrap items-center gap-4">
            <PlaceholderNote>Reporting documents are placeholders</PlaceholderNote>
            <EditorialButton href="/contact" tone="light">
              Request the data
            </EditorialButton>
          </Reveal>
        </div>
      </section>
    </SitePage>
  );
}
