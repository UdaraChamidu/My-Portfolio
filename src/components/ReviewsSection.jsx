import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote, Star, UserRound } from "lucide-react";

const reviews = [
  {
    id: "ai-automation-engineering",
    title: "AI Automations and Engineering",
    rating: "5.0",
    date: "Aug 6, 2026 - Aug 11, 2026",
    image: "/reviews/1.png",
    tags: ["Automation", "ML Automation", "AI Bot", "Generative AI"],
  },
  {
    id: "career-assessment-chatbot",
    title: "AI Career Assessment Chatbot",
    rating: "5.0 from 2 reviews",
    date: "Feb 25, 2026 - Jul 10, 2026",
    image: "/reviews/2.png",
    tags: ["OpenAI API", "Structured Logic", "PDF Output"],
  },
  {
    id: "layout-design-ai-expert",
    title: "AI Expert for Layout Design",
    rating: "5.0",
    date: "May 6, 2026 - Present",
    image: "/reviews/3.png",
    quote: "Honest, talented freelancer",
    tags: ["AI Consulting", "Layout Design"],
  },
];

const slides = [reviews[reviews.length - 1], ...reviews, reviews[0]];

export const ReviewsSection = () => {
  const [position, setPosition] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const active = (position - 1 + reviews.length) % reviews.length;
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const carouselRef = useRef(null);
  const touchStart = useRef(null);
  const positionRef = useRef(1);
  const movingRef = useRef(false);
  const framesRef = useRef([]);

  const settle = useCallback(() => {
    const current = positionRef.current;
    if (current === 0 || current === reviews.length + 1) {
      // The visible clone is identical; reset its position without a backwards slide.
      const next = current === 0 ? reviews.length : 1;
      setTransitionEnabled(false);
      positionRef.current = next;
      setPosition(next);
      framesRef.current.push(requestAnimationFrame(() => {
        framesRef.current.push(requestAnimationFrame(() => {
          setTransitionEnabled(true);
          movingRef.current = false;
          framesRef.current = [];
        }));
      }));
    } else {
      movingRef.current = false;
    }
  }, []);

  const goTo = useCallback((next) => {
    if (movingRef.current || next === positionRef.current) return;
    movingRef.current = true;
    setTransitionEnabled(!reducedMotion);
    positionRef.current = next;
    setPosition(next);
  }, [reducedMotion]);
  const move = useCallback((direction) => goTo(positionRef.current + direction), [goTo]);

  useEffect(() => {
    if (!movingRef.current) return undefined;
    // Also settle when a transition is disabled or its end event is interrupted.
    const timer = setTimeout(settle, reducedMotion ? 0 : 650);
    return () => clearTimeout(timer);
  }, [position, reducedMotion, settle]);

  useEffect(() => () => framesRef.current.forEach(cancelAnimationFrame), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferenceChanged = () => { setReducedMotion(media.matches); if (media.matches) setPlaying(false); };
    media.addEventListener("change", preferenceChanged);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => { observer.disconnect(); media.removeEventListener("change", preferenceChanged); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || !inView || !pageVisible) return undefined;
    const timer = setInterval(() => move(1), 2000);
    return () => clearInterval(timer);
  }, [playing, hovered, focused, inView, pageVisible, move]);

  return (
    <section id="reviews" className="section-shell">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">
            Client Feedback
          </p>
          <h2 className="section-title">
            Client <span className="text-primary">Reviews</span>
          </h2>
          <p className="section-description">
            Ratings and feedback from AI and automation work on Upwork.
          </p>
        </div>

        <div ref={carouselRef} role="region" aria-roledescription="carousel" aria-label="Client reviews" className="review-carousel surface-card mx-auto max-w-4xl overflow-hidden"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { move(dx < 0 ? 1 : -1); setPlaying(false); }
            touchStart.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
          }}>
          <div data-review-position={position} onTransitionEnd={(event) => { if (event.target === event.currentTarget && event.propertyName === "transform") settle(); }} className="grid auto-cols-[100%] grid-flow-col ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${position * 100}%)`, transition: transitionEnabled && !reducedMotion ? "transform 500ms ease-out" : "none" }}>
            {slides.map((review, index) => (
              <article key={`${review.id}-${index}`} role="group" aria-roledescription="slide" aria-label={`${(index - 1 + reviews.length) % reviews.length + 1} of ${reviews.length}`} aria-hidden={position !== index} inert={position !== index ? "" : undefined} className="grid min-w-0 items-center gap-5 p-5 text-left sm:p-7 md:grid-cols-[1.3fr_1fr]">
                <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><Star size={18} className="fill-primary text-primary" aria-hidden="true" />{review.rating}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug sm:text-2xl">{review.title}</h3>
                {review.quote && <blockquote className="mt-4 flex gap-3 text-lg leading-7"><Quote size={24} className="shrink-0 text-primary" aria-hidden="true" /><p>&quot;{review.quote}&quot;</p></blockquote>}
                <div className="mt-5 flex flex-wrap gap-2">{review.tags.map((tag) => <span key={tag} className="meta-tag">{tag}</span>)}</div>
                <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground"><UserRound size={17} className="text-primary" aria-hidden="true" />Upwork client</p>
                </div>
                <figure className="min-w-0 overflow-hidden rounded-md border border-primary/25 bg-white/95 p-2 shadow-sm">
                  <img src={review.image} alt={`Upwork feedback for ${review.title}`} loading="lazy" decoding="async" className="h-36 w-full object-contain sm:h-44" />
                  <figcaption className="mt-2 border-t border-gray-200 pt-2 text-center text-xs font-medium text-gray-700">Upwork feedback</figcaption>
                </figure>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 sm:px-8">
            <div className="flex items-center">{reviews.map((review, index) => <button key={review.id} type="button" aria-label={`Show review ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index + 1)} className="flex h-11 w-6 items-center justify-center rounded-md"><span className={`h-2 rounded-full transition-all ${active === index ? "w-4 bg-primary" : "w-2 bg-primary/30"}`} /></button>)}</div>
            <div className="flex items-center gap-2">
              <button type="button" className="icon-button" aria-label="Previous review" title="Previous review" onClick={() => move(-1)}><ArrowLeft size={18} /></button>
              <button type="button" className="icon-button" aria-label={playing ? "Pause review rotation" : "Play review rotation"} title={playing ? "Pause rotation" : "Play rotation"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
              <button type="button" className="icon-button" aria-label="Next review" title="Next review" onClick={() => move(1)}><ArrowRight size={18} /></button>
            </div>
            <p className="sr-only" aria-live={playing && !focused && !hovered ? "off" : "polite"}>Review {active + 1} of {reviews.length}: {reviews[active].title}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
