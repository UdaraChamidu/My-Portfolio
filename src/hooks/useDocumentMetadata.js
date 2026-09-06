import { useEffect } from "react";

const DEFAULT_TITLE = "Udara Herath | AI Automation Engineer";

export const useDocumentMetadata = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content");

    document.title = title || DEFAULT_TITLE;
    if (description && metaDescription) metaDescription.setAttribute("content", description);

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      if (metaDescription) {
        if (previousDescription === null) metaDescription.removeAttribute("content");
        else metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
};
