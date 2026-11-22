import { useEffect } from "react";

const DEFAULT_TITLE = "Udara Herath | AI Automation Engineer";

export const useDocumentMetadata = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content");
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");
    canonical?.setAttribute("href", new URL(window.location.pathname, "https://udarachamidu.site").href);

    document.title = title || DEFAULT_TITLE;
    if (description && metaDescription) metaDescription.setAttribute("content", description);

    return () => {
      if (canonical && previousCanonical) canonical.setAttribute("href", previousCanonical);
      document.title = previousTitle || DEFAULT_TITLE;
      if (metaDescription) {
        if (previousDescription === null) metaDescription.removeAttribute("content");
        else metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
};
