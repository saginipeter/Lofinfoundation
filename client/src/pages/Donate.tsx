import { useState, type FormEvent } from "react";

import SitePage from "@/components/site/SitePage";
import {
  EditorialButton,
  Eyebrow,
  PlaceholderNote,
  Prose,
  Reveal,
} from "@/components/site/primitives";
import { IMAGES, currency, donate, money, programs } from "@/content/site";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

type Frequency = "monthly" | "once";

export default function DonatePage() {
  usePageMeta("/donate");

  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [amount, setAmount] = useState<number>(donate.presets.monthly[1]);
  const [custom, setCustom] = useState("");
  const [designated, setDesignated] = useState("where-needed");
  const [submitted, setSubmitted] = useState(false);

  const presets = donate.presets[frequency];
  const effectiveAmount = custom.trim() === "" ? amount : Number(custom);
  const validAmount = Number.isFinite(effectiveAmount) && effectiveAmount > 0;

  const changeFrequency = (next: Frequency) => {
    setFrequency(next);
    setAmount(donate.presets[next][1]);
    setCustom("");
    setSubmitted(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <SitePage>
      {/* No banner here: the page keeps the eye on the ask. */}
      <section className="bg-bone">
        <div className="container grid gap-14 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <Reveal>
            <Eyebrow>Donate</Eyebrow>
            <h1 className="mt-4 text-[2.4rem] leading-[1.06] sm:text-[3.25rem]">
              {donate.heading}
            </h1>
            <Prose className="mt-6">
              {donate.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-8 space-y-4">
              <PlaceholderNote>Preview only — no payment provider is linked</PlaceholderNote>
              <div className="border border-dashed border-terracotta/60 bg-terracotta/5 p-5">
                <p className="text-[0.9375rem] leading-relaxed text-spruce">
                  <span className="font-bold">What happens next, when this goes live: </span>
                  {donate.liveNote}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-spruce">
                What a regular gift buys
              </h2>
              <ul className="mt-5 space-y-4">
                {donate.ladder.map((item) => (
                  <li
                    key={item.amount}
                    className="grid grid-cols-[112px_1fr] items-baseline gap-4"
                  >
                    <span className="font-display text-[1.0625rem] leading-snug text-terracotta">
                      {money(Number(item.amount))}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-spruce/85">
                      {item.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[donate.paybill, donate.bank].map((instruction) => (
                <div key={instruction.title} className="border border-border bg-card p-5">
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-spruce">
                    {instruction.title}
                  </h2>
                  <ol className="mt-3 space-y-2 text-[0.875rem] leading-relaxed text-spruce/85">
                    {instruction.lines.map((line, index) => (
                      <li key={line.slice(0, 20)} className="flex gap-3">
                        <span className="font-display text-terracotta" aria-hidden>
                          {index + 1}
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Donation form panel */}
          <Reveal delay={120}>
            <form
              onSubmit={submit}
              noValidate
              className="border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <h2 className="font-display text-[1.5rem] leading-snug">Choose your gift</h2>

              <div
                className="mt-6 grid grid-cols-2 gap-1 border border-border bg-bone p-1"
                role="group"
                aria-label="Giving frequency"
              >
                {(["monthly", "once"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => changeFrequency(option)}
                    aria-pressed={frequency === option}
                    className={cn(
                      "px-4 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition-colors",
                      frequency === option
                        ? "bg-spruce text-bone"
                        : "text-spruce/70 hover:text-spruce",
                    )}
                  >
                    {option === "monthly" ? "Monthly" : "One-time"}
                  </button>
                ))}
              </div>

              <fieldset className="mt-5 border-0 p-0">
                <legend className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70">
                  Amount ({currency.symbol})
                </legend>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {presets.map((preset) => {
                    const active = custom.trim() === "" && amount === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setAmount(preset);
                          setCustom("");
                          setSubmitted(false);
                        }}
                        aria-pressed={active}
                        aria-label={`${money(preset)}${
                          frequency === "monthly" ? " per month" : " once"
                        }`}
                        className={cn(
                          "border py-3 font-display text-[1.0625rem] transition-colors",
                          active
                            ? "border-terracotta-deep bg-terracotta-deep text-white"
                            : "border-border bg-bone text-spruce hover:border-spruce",
                        )}
                      >
                        {preset.toLocaleString("en-KE")}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-4">
                <label
                  htmlFor="custom-amount"
                  className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                >
                  Or enter another amount
                </label>
                <div className="mt-2 flex items-center border border-border bg-bone focus-within:border-spruce">
                  <span className="pl-4 font-display text-[0.9375rem] text-spruce/60" aria-hidden>
                    {currency.symbol}
                  </span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="50"
                    step="50"
                    inputMode="numeric"
                    value={custom}
                    onChange={(event) => {
                      setCustom(event.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="Other"
                    className="w-full bg-transparent px-3 py-3 text-[1.0625rem] outline-none"
                  />
                </div>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground">
                  Minimum M-Pesa gift KSh 50. Card gifts from outside Kenya can be any amount.
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="designation"
                  className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-spruce/70"
                >
                  Direct my gift to
                </label>
                <select
                  id="designation"
                  value={designated}
                  onChange={(event) => setDesignated(event.target.value)}
                  className="mt-2 w-full border border-border bg-bone px-4 py-3 text-[0.9375rem] outline-none focus:border-spruce"
                >
                  <option value="where-needed">Where needed most</option>
                  {programs.map((program) => (
                    <option key={program.slug} value={program.slug}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!validAmount}
                className={cn(
                  "mt-7 w-full px-6 py-4 text-[0.75rem] font-bold uppercase tracking-[0.18em] transition-colors",
                  validAmount
                    ? "bg-terracotta-deep text-white hover:bg-spruce"
                    : "cursor-not-allowed bg-muted text-muted-foreground",
                )}
              >
                {submitted
                  ? "Preview only — nothing was charged"
                  : `Give ${money(validAmount ? effectiveAmount : 0)}${
                      frequency === "monthly" ? " / month" : ""
                    }`}
              </button>

              <p aria-live="polite" className="sr-only">
                {submitted
                  ? "Preview only. No payment provider is connected and nothing was charged."
                  : ""}
              </p>

              {submitted && (
                <div
                  role="status"
                  className="mt-4 border border-gold/70 bg-gold/10 p-4 text-[0.875rem] leading-relaxed text-spruce"
                >
                  This is where checkout would open: an M-Pesa STK push asking the phone number you
                  give us to confirm the gift, or a card form for donors outside Kenya. Neither is
                  connected in the draft, so no details are collected, nothing is stored and no
                  donation has been made.
                </div>
              )}

              <p className="mt-4 text-[0.75rem] leading-relaxed text-muted-foreground">
                Placeholder note: before accepting any real gift, publish the NGO Coordination Board
                registration number, the KRA PIN, the paybill and account numbers, the fee policy and
                how to request a refund or a receipt.
              </p>
            </form>

            <div className="mt-8 overflow-hidden bg-spruce-deep">
              <img
                src={IMAGES.storyHealth}
                alt="A Kenyan community health worker weighing a baby at an outreach clinic"
                className="aspect-[16/10] size-full object-cover opacity-90"
                loading="lazy"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <EditorialButton href="/impact" tone="outline">
                Where it goes
              </EditorialButton>
              <EditorialButton href="/get-involved#give" tone="outline">
                Other ways to give
              </EditorialButton>
            </div>
          </Reveal>
        </div>
      </section>
    </SitePage>
  );
}
