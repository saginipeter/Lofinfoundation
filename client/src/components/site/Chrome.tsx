import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

import { contact, footerColumns, nav, org } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { EditorialButton, Eyebrow, Reveal } from "./primitives";

const RIBBON_KEY = "lofin-draft-ribbon-dismissed";

/** Honest disclosure that the site is a sample build, not the live organisation. */
export function DraftRibbon() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(RIBBON_KEY) === "1");
    } catch {
      // Blocked storage (third-party iframe): the notice simply shows again.
    }
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-gold text-ink print:hidden">
      <div className="container flex items-center justify-center gap-3 py-2 text-center text-[0.75rem] font-medium">
        <span>Preview draft. All copy, figures, names and photos on this site are placeholders.</span>
        <button
          type="button"
          aria-label="Dismiss draft notice"
          onClick={() => {
            try {
              window.localStorage.setItem(RIBBON_KEY, "1");
            } catch {
              // Ignore storage failures; dismissal is a convenience only.
            }
            setDismissed(true);
          }}
          className="shrink-0 rounded-full p-1 hover:bg-ink/15"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(68);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer is positioned from the measured header, which changes height
  // when the draft ribbon is dismissed.
  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    const measure = () => setHeaderHeight(node.offsetHeight);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
   };
  }, [open]);

  // Escape closes and returns focus to the toggle; opening focuses the drawer.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    drawerRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
      else triggerRef.current?.focus();
    };
  }, [open]);

  const isActive = (href: string) => location === href || location.startsWith(`${href}/`);

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-navy/95 backdrop-blur transition-shadow",
        scrolled
          ? "border-border shadow-[0_10px_30px_-28px_rgba(10,36,39,0.8)]"
          : "border-transparent",
      )}
    >
      <div className="container flex items-center justify-between gap-6 py-3.5">
        <Link href="/" aria-label={`${org.name} home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "link-underline text-[0.8125rem] font-medium tracking-wide text-paper/85 hover:text-paper",
                isActive(item.href) && "text-paper",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/donate"
            className="bg-gold px-5 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
          >
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-paper lg:hidden"
          ref={triggerRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
    </header>

    {/* Sibling of the header: a backdrop-filter ancestor would otherwise turn the
        sticky header into the containing block for this fixed panel. */}
    {open && (
      <div
        id="mobile-navigation"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        style={{ top: headerHeight }}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-navy outline-none lg:hidden"
      >
        <nav aria-label="Mobile" className="container flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b border-border py-4 font-display text-2xl text-paper",
                isActive(item.href) && "text-terracotta",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="mt-6 bg-terracotta-deep px-6 py-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white"
          >
            Donate
          </Link>
          <p className="mt-8 text-sm text-muted-foreground">{contact.email}</p>
        </nav>
      </div>
    )}
    </>
  );
}

/** Inner-page banner: photograph, dark scrim, page title. */
export function PageBanner({
  eyebrow,
  title,
  intro,
  image,
  alt,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <img src={image} alt={alt} className="absolute inset-0 size-full object-cover opacity-55" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/25"
        aria-hidden
      />
      <div className="container relative py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-[1.05] text-paper sm:text-5xl md:text-6xl">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-paper/80">{intro}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState(valid ? "done" : "error");
  };

  return (
    <div>
      <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="EMAIL ADDRESS"
          className="min-w-0 flex-1 border border-paper/30 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.12em] text-paper placeholder:text-paper/45 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="border border-gold bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
        >
          Sign up
        </button>
      </form>
      <p
        className={cn("mt-3 text-[0.75rem]", state === "error" ? "text-gold" : "text-paper/55")}
        role={state === "error" ? "alert" : undefined}
      >
        {state === "error" && "Enter a valid email address."}
        {state === "done" && "Placeholder confirmation. No mailing list is connected yet."}
        {state === "idle" &&
          "One email a month on new grants and reporting. This form is front-end only in the draft."}
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="container grid gap-14 py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Wordmark tone="light" />
          <p className="mt-6 max-w-md font-display text-[1.375rem] leading-snug text-paper/85">
            {org.strapline}
          </p>
          <p className="mt-2 max-w-md text-[0.9375rem] italic leading-snug text-gold/80">
            {org.straplineSw}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {org.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${org.name} on ${social.label}`}
                className="border border-paper/25 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/75 transition-colors hover:border-gold hover:text-gold"
              >
                {social.short}
              </a>
            ))}
          </div>
          <div className="mt-12">
            <Eyebrow className="text-gold">Stay connected</Eyebrow>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper/50">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="link-underline text-[0.9375rem] text-paper/85 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container flex flex-col gap-3 py-6 text-[0.75rem] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              {new Date().getFullYear()} {org.name}. {org.registrationNote}
            </p>
            <p className="text-paper/45">{org.taxNote}</p>
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-paper">
              Contact
            </Link>
            <Link href="/about#leadership" className="hover:text-paper">
              Governance
            </Link>
            <Link href="/impact" className="hover:text-paper">
              Transparency
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Shared call-to-action band used above the footer on interior pages. */
export function SupportBand({
  title = "Support the work",
  body = "Monthly giving is what lets a foundation say yes to a three-year commitment instead of a three-month one.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-navy-raise">
      <div className="container flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <Reveal className="max-w-2xl">
          <Eyebrow>Take it further</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-paper/80">{body}</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          <EditorialButton href="/donate" tone="solid">
            Donate
          </EditorialButton>
          <EditorialButton href="/get-involved" tone="outline">
            Get involved
          </EditorialButton>
        </div>
      </div>
    </section>
  );
}
