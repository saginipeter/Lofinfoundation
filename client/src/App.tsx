import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";

import { scrollToId } from "@/components/site/primitives";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import GetInvolved from "./pages/GetInvolved";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import OurWork from "./pages/OurWork";
import ProgramDetail from "./pages/ProgramDetail";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";

/**
 * Wouter navigates without firing `hashchange`, so anchor scrolling is handled
 * here instead of by the browser:
 * - a click on an anchor whose path is the current page scrolls in place;
 * - any location change either scrolls to the URL hash or returns to the top.
 */
function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const target = href.slice(hashIndex + 1);
      const path = href.slice(0, hashIndex);
      if (!target) return;
      if (path && path !== window.location.pathname) return;

      // Same page: let the browser skip its default, then smooth-scroll.
      event.preventDefault();
      history.replaceState(history.state, "", `${path || window.location.pathname}#${target}`);
      scrollToId(target);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) scrollToId(hash);
    else window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/our-work"} component={OurWork} />
      <Route path={"/our-work/:slug"} component={ProgramDetail} />
      <Route path={"/impact"} component={Impact} />
      <Route path={"/stories"} component={Stories} />
      <Route path={"/stories/:slug"} component={StoryDetail} />
      <Route path={"/get-involved"} component={GetInvolved} />
      <Route path={"/donate"} component={Donate} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * LOFIN Foundation
 * Deep navy ground and brand colour, paper text, terracotta and gold signals.
 * Palette and type tokens live in index.css; all copy and figures live in content/site.ts.
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollManager />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
