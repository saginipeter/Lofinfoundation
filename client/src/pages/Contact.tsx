import { useMemo, useState, type FormEvent } from "react";
import { useSearch } from "wouter";

import SitePage from "@/components/site/SitePage";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
} from "@/components/site/primitives";
import { contact, impactFaq, org } from "@/content/site";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  usePageMeta("/contact");

  // Program pages link here with ?topic=… so an enquiry arrives already sorted.
  const search = useSearch();
  const topicFromUrl = useMemo(() => {
    const requested = new URLSearchParams(search || "").get("topic");
    return requested && contact.topics.includes(requested as (typeof contact.topics)[number])
      ? requested
      : contact.topics[0];
  }, [search]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    topic: topicFromUrl,
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof values, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
    setSent(false);
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const validate = () => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = "Tell us who you are.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "Enter an email address we can reply to.";
    }
    if (values.message.trim().length < 20) {
      next.message = "A sentence or two about the place and the problem, please.";
    }
    return next;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
  };

  const inputClass = (invalid?: string) =>
    cn(
      "mt-2 w-full border bg-bone px-4 py-3 text-[0.9375rem] outline-none transition-colors",
      invalid ? "border-destructive" : "border-border focus:border-spruce",
    );

  return (
    <SitePage>
      <section className="bg-bone">
        <div className="container grid gap-14 py-16 lg:grid-cols-[1fr_1.25fr] lg:py-20">
          {/* Details */}
          <Reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[2.2rem] leading-[1.06] sm:text-[2.8rem]">
              {contact.heading}
            </h1>
            <Prose className="mt-5">
              <p>{contact.intro}</p>
            </Prose>

            <div className="mt-10 space-y-7 border-t border-border pt-8">
              <div>
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-spruce/60">
                  Office
                </h2>
                <address className="mt-3 not-italic text-[1.0625rem] leading-relaxed text-spruce">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-spruce/60">
                    Email
                  </h2>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline mt-3 inline-block text-[1.0625rem] text-spruce hover:text-terracotta"
                  >
                    {contact.email}
                  </a>
                </div>
                <div>
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-spruce/60">
                    Telephone
                  </h2>
                  <p className="mt-3 text-[1.0625rem] text-spruce">{contact.phone}</p>
                </div>
              </div>

              <div>
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-spruce/60">
                  Office hours
                </h2>
                <p className="mt-3 text-[1.0625rem] text-spruce">{contact.hours}</p>
              </div>

              <PlaceholderNote>Address, phone and email unconfirmed</PlaceholderNote>

              <div className="border border-border bg-card p-6">
                <p className="text-[0.9375rem] font-medium text-spruce">{org.registrationNote}</p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-spruce/75">
                  Add the registered number, the governing document and the complaints procedure
                  here — most regulators expect them reachable from the contact page.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Enquiry form: front-end only in this draft */}
          <Reveal delay={120}>
            <form
              onSubmit={submit}
              noValidate
              aria-describedby="form-status"
              className="border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9"
            >
              <h2 className="font-display text-[1.6rem] leading-snug">Send an enquiry</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/75">
                Five fields, one paragraph. We read everything.
              </p>

              <div className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                    >
                      Your name <span aria-hidden>*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="name"
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputClass(errors.name)}
                      placeholder="[Full name]"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-[0.8125rem] text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="organisation"
                      className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                    >
                      Organisation
                    </label>
                    <input
                      id="organisation"
                      value={values.organisation}
                      onChange={(event) => update("organisation", event.target.value)}
                      className={inputClass()}
                      placeholder="[Optional]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                  >
                    Email <span aria-hidden>*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(errors.email)}
                    placeholder="you@example.org"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-[0.8125rem] text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                  >
                    What is this about?
                  </label>
                  <select
                    id="topic"
                    value={values.topic}
                    onChange={(event) => update("topic", event.target.value)}
                    className={inputClass()}
                  >
                    {contact.topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                  >
                    The place and the problem <span aria-hidden>*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(event) => update("message", event.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(inputClass(errors.message), "resize-y")}
                    placeholder="Two or three sentences is plenty at this stage."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-[0.8125rem] text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <label className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-spruce/80">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    className="mt-1 size-4 accent-[var(--terracotta)]"
                  />
                  <span>
                    I am happy for {org.name} to keep this message on file while replying.
                    <span className="mt-1 block text-[0.8125rem] text-muted-foreground">
                      Consent text is a placeholder — write the real privacy notice before launch.
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="bg-terracotta-deep px-7 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-spruce"
                >
                  Send enquiry
                </button>
                <p className="text-[0.8125rem] text-muted-foreground">
                  Front-end only in this draft — nothing is sent or stored.
                </p>
              </div>

              <div id="form-status" role="status" aria-live="polite">
                {sent && (
                  <div className="mt-6 border border-sage/50 bg-sage/10 p-5 text-[0.9375rem] leading-relaxed text-spruce">
                    <p className="font-bold">Message composed, not sent.</p>
                    <p className="mt-2 text-spruce/85">
                      When the site goes live this form needs a backend: connect it to email or a
                      database record, add spam protection, and confirm which lawful basis you are
                      relying on for storing enquiries.
                    </p>
                    <p className="mt-2 text-spruce/85">
                      Draft summary: <span className="font-medium">{values.topic}</span> from{" "}
                      <span className="font-medium">{values.name}</span> ({values.email})
                      {values.organisation ? ` of ${values.organisation}` : ""}.
                    </p>
                  </div>
                )}
              </div>
            </form>

            <div className="mt-10 flex flex-wrap gap-3">
              <EditorialButton href="/donate" tone="solid">
                Donate instead
              </EditorialButton>
              <EditorialButton href="/get-involved#volunteer" tone="outline">
                Volunteer
              </EditorialButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border bg-bone-deep">
        <div className="container py-20">
          <Eyebrow>Questions we actually get</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl sm:text-4xl">Answers, before you ask twice</h2>
          <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {impactFaq.map((faq, index) => (
              <div key={faq.q}>
                <Reveal delay={index * 70}>
                  <div className="border-t-2 border-spruce pt-5">
                    <dt className="text-[1.125rem] leading-snug">{faq.q}</dt>
                    <dd className="mt-3 text-[0.9375rem] leading-relaxed text-spruce/80">
                      {faq.a}
                    </dd>
                  </div>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SitePage>
  );
}
