import { Link } from "wouter";

import { PageBanner, SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
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
  events,
  partnerTypes,
  pathways,
  placements,
  roles,
  waysToGive,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function GetInvolved() {
  usePageMeta("/get-involved");

  return (
    <SitePage>
      <PageBanner
        eyebrow="Get involved"
        title="Four ways in, and none of them need a donation"
        intro="Skills, introductions, patience and money are all useful. Choose the one that costs you least to sustain."
        image={IMAGES.getInvolved}
        alt="Volunteers planting riverbank saplings together"
      />

      {/* Pathways */}
      <section aria-labelledby="pathways-heading" className="bg-bone">
        <div className="container py-20">
          <SectionHeading align="left" id="pathways-heading">
            Choose your route
          </SectionHeading>
          <ul className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {pathways.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 80}>
                  <div className="flex h-full flex-col border-t-2 border-spruce bg-card p-6">
                    <span className="font-display text-2xl text-terracotta">0{index + 1}</span>
                    <h3 className="mt-3 text-[1.1875rem] leading-snug">{item.title}</h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {item.body}
                    </p>
                    <div className="mt-6">
                      <EditorialButton href={item.href} tone="outline">
                        {item.cta}
                      </EditorialButton>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Volunteering */}
      <section
        id="volunteer"
        aria-labelledby="volunteer-heading"
        className="scroll-mt-24 border-y border-border bg-bone-deep"
      >
        <div className="container py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Volunteer</Eyebrow>
              <h2 id="volunteer-heading" className="mt-3 text-3xl sm:text-4xl">
                Open placements
              </h2>
            </div>
            <PlaceholderNote>Placeholder roles and dates</PlaceholderNote>
          </div>

          <table className="mt-10 w-full border-collapse border border-border bg-card text-left">
            <caption className="sr-only">Volunteer placements with commitment, location and closing date</caption>
            <thead>
              <tr className="border-b border-border bg-bone">
                {["Role", "Commitment", "Location", "Applications close"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-spruce"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {placements.map((placement) => (
                <tr key={placement.role} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-5 text-left align-top font-display text-[1.0625rem] font-normal leading-snug text-spruce">
                    {placement.role}
                  </th>
                  <td className="px-5 py-5 align-top text-[0.9375rem] text-spruce/85">
                    {placement.commitment}
                  </td>
                  <td className="px-5 py-5 align-top text-[0.9375rem] text-spruce/85">
                    {placement.location}
                  </td>
                  <td className="px-5 py-5 align-top text-[0.9375rem] text-spruce/85">
                    {placement.closes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-6 text-[0.9375rem] text-spruce/80">
            Panel members get a briefing pack and an expense, because reading applications is work.
          </p>
        </div>
      </section>

      {/* Partnership */}
      <section id="partner" aria-labelledby="partner-heading" className="scroll-mt-24 bg-bone">
        <div className="container py-20">
          <Eyebrow>Partner</Eyebrow>
          <h2 id="partner-heading" className="mt-3 text-3xl sm:text-4xl">
            Who we work alongside
          </h2>
          <Prose className="mt-5 max-w-2xl">
            <p>
              A foundation that only writes cheques is a bank with extra paperwork. These are the
              four kinds of partnership that change what we can fund.
            </p>
          </Prose>
          <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((type, index) => (
              <li key={type.title}>
                <Reveal delay={index * 70}>
                  <div className="h-full border border-border bg-card p-6">
                    <h3 className="text-[1.0625rem] leading-snug">{type.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {type.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ways to give */}
      <section
        id="give"
        aria-labelledby="give-heading"
        className="scroll-mt-24 border-y border-border bg-bone-deep"
      >
        <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <Eyebrow>Give</Eyebrow>
            <h2 id="give-heading" className="mt-3 text-3xl leading-tight sm:text-4xl">
              Ways to give
            </h2>
            <Prose className="mt-5">
              <p>
                Regular giving is what allows a foundation to promise a partner three years instead
                of three months. Everything else is welcome but less useful to us.
              </p>
            </Prose>
            <div className="mt-6 flex flex-wrap gap-3">
              <EditorialButton href="/donate" tone="solid">
                Donate now
              </EditorialButton>
            </div>
          </Reveal>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
            {waysToGive.map((way, index) => (
              <li key={way.title}>
                <Reveal delay={index * 70}>
                  <div className="flex h-full flex-col border-t-2 border-terracotta bg-card p-6">
                    <h3 className="text-[1.0625rem] leading-snug">{way.title}</h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-spruce/85">
                      {way.body}
                    </p>
                    <Link
                      href={way.href}
                      className="mt-5 inline-flex w-fit border-b border-spruce/30 pb-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-spruce hover:border-terracotta hover:text-terracotta"
                    >
                      {way.cta}
                    </Link>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Careers */}
      <section
        id="careers"
        aria-labelledby="careers-heading"
        className="scroll-mt-24 bg-bone"
      >
        <div className="container py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Work with us</Eyebrow>
              <h2 id="careers-heading" className="mt-3 text-3xl sm:text-4xl">
                Current roles
              </h2>
            </div>
            <PlaceholderNote>Salary bands unconfirmed</PlaceholderNote>
          </div>

          <table className="mt-10 w-full border-collapse border border-border bg-card text-left">
            <caption className="sr-only">Open roles with contract type and salary band</caption>
            <thead>
              <tr className="border-b border-border bg-bone-deep">
                {["Role", "Type", "Band", ""].map((heading) => (
                  <th
                    key={heading || "apply"}
                    scope="col"
                    className="px-5 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-spruce"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.title} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-5 text-left font-display text-[1.0625rem] font-normal leading-snug text-spruce">
                    {role.title}
                  </th>
                  <td className="px-5 py-5 text-[0.9375rem] text-spruce/85">{role.type}</td>
                  <td className="px-5 py-5 text-[0.9375rem] text-spruce/85">{role.grade}</td>
                  <td className="px-5 py-5 text-right">
                    <Link
                      href="/contact"
                      className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-terracotta hover:text-spruce"
                    >
                      Apply
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Events */}
      <section aria-labelledby="events-heading" className="border-t border-border bg-spruce-deep text-bone">
        <div className="container py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow className="text-gold">Events</Eyebrow>
              <h2 id="events-heading" className="mt-3 text-3xl text-bone sm:text-4xl">
                Where you can find us
              </h2>
            </div>
            <PlaceholderNote>Dates and venues are placeholders</PlaceholderNote>
          </div>

          <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-3">
            {events.map((event, index) => (
              <li key={`${event.year}-${event.title}`}>
                <Reveal delay={index * 80}>
                  <div className="flex h-full gap-5 border-t-2 border-gold pt-5">
                    <p className="shrink-0 text-center">
                      <span className="block font-display text-[1.75rem] leading-none text-bone">
                        {event.date}
                      </span>
                      <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.16em] text-bone/60">
                        {event.year}
                      </span>
                    </p>
                    <div>
                      <h3 className="text-[1.0625rem] leading-snug text-bone">{event.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/75">
                        {event.detail}
                      </p>
                      <p className="mt-3 text-[0.75rem] uppercase tracking-[0.14em] text-gold">
                        {event.place}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SupportBand
        title="Not sure which route fits?"
        body="Send two sentences about what you have and what you want to change. A person reads every one of these."
      />
    </SitePage>
  );
}
