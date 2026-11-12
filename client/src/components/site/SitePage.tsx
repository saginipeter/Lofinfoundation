import type { ReactNode } from "react";

import { DraftRibbon, Footer, Header } from "./Chrome";
import { SkipLink } from "./primitives";

export default function SitePage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DraftRibbon />
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
