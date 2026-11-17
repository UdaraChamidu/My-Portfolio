import { useEffect } from "react";

// Observe newly mounted filter results as well as the initial page sections.
export const usePortfolioMotion = (containerRef) => {
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !window.IntersectionObserver || !window.MutationObserver) return undefined;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Set();
    const selector = ".section-header, article.surface-card, .service-row, #about .surface-card, .contact-panel, .skill-logo-grid";
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 24px 0px" });

    const register = () => {
      tracked.forEach((element) => {
        if (!root.contains(element)) {
          observer.unobserve(element);
          tracked.delete(element);
        }
      });
      root.querySelectorAll(selector).forEach((element) => {
        if (tracked.has(element)) return;
        tracked.add(element);
        if (preference.matches) return;
        element.classList.add("reveal-enter");
        observer.observe(element);
      });
    };
    const showAll = () => {
      if (!preference.matches) return;
      tracked.forEach((element) => element.classList.add("reveal-visible"));
      observer.disconnect();
    };
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener("change", showAll);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", showAll);
      tracked.forEach((element) => element.classList.remove("reveal-enter", "reveal-visible"));
    };
  }, [containerRef]);
};
