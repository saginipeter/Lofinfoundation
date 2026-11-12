import { useEffect } from "react";
import { Link, useLocation } from "wouter";

import { DraftRibbon, Footer, Header } from "@/components/site/Chrome";
import { EditorialButton, Eyebrow, SkipLink } from "@/components/site/primitives";

// Hosting answers this path with HTTP 404 while still serving the app.
const NOT_FOUND_PATH = "/404";

// Render for unknown routes and for items confirmed missing (e.g. `/stories/:slug`).
// The redirect is irreversible: never render while loading, or before content resolves.
export default function NotFound() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    // Full-page navigation: a client-side route change sends no request, so no 404 status.
    if (window.location.pathname.replace(/\/$/, "") !== NOT_FOUND_PATH) {
      window.location.replace(NOT_FOUND_PATH);
    }

    return () => robots.remove();
  }, []);

  useEffect(() => {
    document.title = "Page not found — LOFIN Foundation";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DraftRibbon />
      <SkipLink />
      <Header />
      <main id="main" className="flex-1 bg-bone">
        <div className="container flex flex-col items-start gap-8 py-24 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] sm:text-[3.5rem]">
              That page has moved, or was never written
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-spruce/80">
              The story, program or report you asked for is not in this draft. Try the index of
              stories, or send us the link you expected to work and we will fix it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <EditorialButton href="/stories" tone="solid">
                Browse stories
              </EditorialButton>
              <EditorialButton href="/our-work" tone="outline">
                Our work
              </EditorialButton>
            </div>
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="link-underline mt-8 text-[0.8125rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-spruce"
            >
              Return home
            </button>
          </div>

          <div className="border border-border bg-card p-8">
            <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-spruce">
              Popular destinations
            </h2>
            <ul className="mt-5 space-y-4">
              {[
                { href: "/about", label: "About the foundation" },
                { href: "/impact", label: "Impact and transparency" },
                { href: "/get-involved", label: "Volunteer or partner" },
                { href: "/donate", label: "Donate" },
                { href: "/contact", label: "Contact a person" },
              ].map((item) => (
                <li key={item.href} className="border-b border-border pb-4 last:border-0">
                  <Link href={item.href} className="link-underline text-[1.0625rem] hover:text-terracotta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
