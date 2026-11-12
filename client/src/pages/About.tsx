import { PageBanner, SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import {
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
  SectionHeading,
} from "@/components/site/primitives";
import {
  financials,
  IMAGES,
  governanceDocuments,
  history,
  org,
  people,
  pillars,
  values,
  type Person,
} from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";

function monogram(person: Person, index: number) {
  const cleaned = person.name.replace(/[[\]]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  // Bracketed placeholder names would all collapse to the same two letters,
  // so real names use initials and placeholders fall back to a position label.
  if (words.length < 2 || person.name.startsWith("[")) {
    return String(index + 1).padStart(2, "0");
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  return (
    <article className="group h-full border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-spruce font-display text-lg text-bone transition-colors group-hover:bg-terracotta-deep"
        >
          {monogram(person, index)}
        </span>
        <div>
          <h3 className="font-display text-lg leading-tight">{person.name}</h3>
          <p className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-sage">
            {person.role}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-spruce/85">{person.bio}</p>
    </article>
  );
}

export default function About() {
  usePageMeta("/about");

  const groups = ["Staff", "Board", "Advisory"] as const;

  return (
    <SitePage>
      <PageBanner
        eyebrow="About us"
        title="A foundation built to be useful before it is impressive"
        intro="Purpose, vision, values, the people accountable for the money, and how we got here."
        image={IMAGES.heroCommunity}
        alt="A Kenyan community group meeting outdoors under an acacia tree"
      >
        <div className="mt-7">
          <PlaceholderNote>Organisation details below are placeholders</PlaceholderNote>
        </div>
      </PageBanner>

      <section aria-labelledby="pillars-heading" className="bg-bone">
        <h2 id="pillars-heading" className="sr-only">
          Purpose, vision and approach
        </h2>
        <div className="container grid gap-10 py-20 md:grid-cols-3 lg:gap-14">
          {pillars.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <div className="border-t-2 border-spruce pt-6">
                <Eyebrow>{item.label}</Eyebrow>
                <p className="mt-4 font-display text-[1.35rem] leading-snug">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bone-deep">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 text-[1.9rem] leading-tight sm:text-[2.35rem]">
              {org.strapline}
            </h2>
            <Prose className="mt-6">
              <p>
                Placeholder founding story: the family, company or community that started{" "}
                {org.name}, the specific problem that made it necessary, and the first grant that
                proved the model.
              </p>
              <p>
                Two or three paragraphs is the right length for this block. Readers who want the
                detail go to the history timeline and the governance section below.
              </p>
            </Prose>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden bg-spruce-deep">
            <img
              src={IMAGES.aboutValues}
              alt="Kenyan growers potting tree seedlings in a community nursery"
              className="aspect-[4/3] size-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-bone">
        <div className="container py-20">
          <SectionHeading id="values-heading">What we believe</SectionHeading>
          <ul className="mt-14 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li key={value.title}>
                <Reveal delay={index * 80}>
                  <div className="flex h-full flex-col border border-border bg-card p-6">
                    <span className="font-display text-2xl text-terracotta">0{index + 1}</span>
                    <h3 className="mt-4 text-lg leading-snug">{value.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* History */}
      <section aria-labelledby="history-heading" className="border-t border-border bg-spruce-deep text-bone">
        <div className="container py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow className="text-gold">History</Eyebrow>
              <h2 id="history-heading" className="mt-3 text-3xl text-bone sm:text-4xl">
                From {org.foundedYear} to now
              </h2>
            </div>
            <PlaceholderNote>Milestones are illustrative</PlaceholderNote>
          </div>

          <ol className="mt-14 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {history.map((milestone, index) => (
              <li key={milestone.year} className="relative pl-6">
                <Reveal delay={index * 70}>
                  <span aria-hidden className="absolute left-0 top-2 size-2 rounded-full bg-gold" />
                  <span
                    aria-hidden
                    className="absolute left-[3.5px] top-5 h-[calc(100%-0.5rem)] w-px bg-bone/20"
                  />
                  <p className="font-display text-[2rem] leading-none text-bone">{milestone.year}</p>
                  <h3 className="mt-3 text-[1.0625rem] text-gold">{milestone.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/80">
                    {milestone.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership and governance */}
      <section id="leadership" className="scroll-mt-24 bg-bone">
        <div className="container py-20">
          <SectionHeading id="people-heading">People &amp; governance</SectionHeading>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[1.0625rem] leading-relaxed text-spruce/80">
            Monogram avatars are used deliberately. Once you send photographs and real names, they
            drop straight into the content file.
          </p>

          <div className="mt-14 space-y-14">
            {groups.map((group) => {
              const members = people.filter((person) => person.group === group);
              if (members.length === 0) return null;
              return (
                <div key={group}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-spruce">
                      {group}
                    </h3>
                    <p className="text-[0.75rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {members.length} listed
                    </p>
                  </div>
                  <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((person, index) => (
                      <li key={`${group}-${person.role}`}>
                        <Reveal delay={index * 70}>
                          <PersonCard person={person} index={index} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Financials */}
          <div className="mt-16 border border-border bg-card p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-spruce">
                Finances at a glance
              </h3>
              <PlaceholderNote>{financials.note}</PlaceholderNote>
            </div>
            <table className="mt-6 w-full border-collapse text-left">
              <caption className="sr-only">
                Placeholder financial summary: expenditure, operating costs, funds held and auditor
              </caption>
              <tbody>
                {financials.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <th scope="row" className="py-4 pr-4 font-medium text-spruce">
                      {row.label}
                    </th>
                    <td className="py-4 pr-4 text-right font-display text-[1.35rem] leading-none text-spruce">
                      {row.value}
                    </td>
                    <td className="hidden py-4 text-[0.875rem] text-muted-foreground sm:table-cell">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Documents */}
          <ul className="mt-8 grid list-none gap-6 p-0 pt-8 md:grid-cols-3">
            {governanceDocuments.map((doc) => (
              <li key={doc.title}>
                <Reveal>
                  <div className="h-full border border-dashed border-border bg-card p-6">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">
                      Document
                    </p>
                    <h3 className="mt-3 font-display text-lg">{doc.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-spruce/85">{doc.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SupportBand
        title="Want to work with us?"
        body="We meet organisations before they apply, and we answer every enquiry in writing."
      />
    </SitePage>
  );
}
