import { useEffect } from "react";

import { org, pageMeta } from "@/content/site";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Keeps the title and description of every route driven from content/site.ts.
 *
 * `path` is the canonical route used for metadata lookup and og:url, so detail
 * pages pass their own URL (`/stories/:slug`) plus a specific title and
 * description rather than inheriting the index page's.
 */
export function usePageMeta(
  path: string,
  overrides?: { title?: string; description?: string },
) {
  useEffect(() => {
    const entry = pageMeta[path];
    const title = overrides?.title ?? entry?.title ?? `${org.name}`;
    const description = overrides?.description ?? entry?.description ?? org.strapline;
    const cleanPath = path.split("#")[0].split("?")[0];

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${window.location.origin}${cleanPath}`);
  }, [path, overrides?.title, overrides?.description]);
}
