import { useEffect, useRef, useState } from "react";
import { advanceHeadline, headlineTiming, heroHeadlines, initialHeadlineFrame } from "@/data/heroHeadlines";

export const RotatingHeroHeadline = () => {
  const [frame, setFrame] = useState(initialHeadlineFrame);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [inView, setInView] = useState(false);
  const headingRef = useRef(null);
  const playing = !reducedMotion && pageVisible && inView;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => { setReducedMotion(preference.matches); setFrame(initialHeadlineFrame); };
    const onVisibility = () => setPageVisible(!document.hidden);
    const observer = window.IntersectionObserver ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting)) : null;
    if (observer && headingRef.current) observer.observe(headingRef.current);
    else setInView(true);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => setFrame(advanceHeadline), headlineTiming[frame.phase]);
    return () => clearTimeout(timer);
  }, [frame, playing]);

  const index = reducedMotion ? 0 : frame.index;
  const [first, second] = heroHeadlines[index];
  const characters = reducedMotion ? first.length + second.length + 1 : frame.characters;
  const firstText = first.slice(0, characters);
  const secondText = second.slice(0, Math.max(0, characters - first.length - 1));
  const cursor = !reducedMotion && <span className="hero-type-caret" />;

  return (
    <h1 ref={headingRef} className="hero-reveal hero-client-title font-bold" style={{ "--hero-delay": "160ms" }}>
      <span className="sr-only">{heroHeadlines[0].join(" ")}</span>
      <span aria-hidden="true" className="hero-typewriter" data-headline-index={index} data-phase={reducedMotion ? "static" : frame.phase} data-playing={playing}>
        <span className="hero-headline-line">{firstText}{characters <= first.length && cursor}</span>
        <span className="hero-headline-line text-primary">{secondText}{characters > first.length && cursor}</span>
      </span>
    </h1>
  );
};
