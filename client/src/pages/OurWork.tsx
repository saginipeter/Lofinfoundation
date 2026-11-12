import { PageBanner, SupportBand } from "@/components/site/Chrome";
import SitePage from "@/components/site/SitePage";
import { ProgramCard } from "@/components/site/cards";
import {
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
} from "@/components/site/primitives";
import { ourWorkIntro, programs, strategyFigures } from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function OurWork() {
  usePageMeta("/our-work");

  return (
    <SitePage>
      <PageBanner
        eyebrow="Our work"
        title={ourWorkIntro.title}
        intro={ourWorkIntro.intro}
        image={ourWorkIntro.image}
        alt={ourWorkIntro.alt}
      />

      <section className="bg-bone">
        <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>How to read these pages</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight">{ourWorkIntro.heading}</h2>
            <Prose className="mt-5">
              {ourWorkIntro.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Prose>
            <div className="mt-6">
              <PlaceholderNote>Sample grant data</PlaceholderNote>
            </div>
          </Reveal>

          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2">
            {programs.map((program, index) => (
              <li key={program.slug}>
                <Reveal delay={index * 80}>
                  <ProgramCard program={program} index={index} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-bone-deep">
        <div className="container grid gap-10 py-16 md:grid-cols-3">
          {strategyFigures.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <div className="border-t-2 border-terracotta pt-5">
                <p className="font-display text-[2.5rem] leading-none text-spruce">{item.value}</p>
                <h2 className="mt-3 text-[1.0625rem]">{item.label}</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-spruce/85">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SupportBand
        title="Are you working in one of these areas?"
        body="We do not accept unsolicited applications in the usual sense — tell us what you are trying to change and we will tell you whether it fits."
      />
    </SitePage>
  );
}
