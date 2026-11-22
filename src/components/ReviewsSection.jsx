import { useEffect, useRef, useState } from "react";
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

export const ReviewsSection = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const carouselRef = useRef(null);
  const touchStart = useRef(null);
  const move = (direction) => setActive((index) => (index + direction + reviews.length) % reviews.length);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferenceChanged = () => { if (media.matches) setPlaying(false); };
    media.addEventListener("change", preferenceChanged);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => { observer.disconnect(); media.removeEventListener("change", preferenceChanged); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || !inView || !pageVisible) return undefined;
    const timer = setInterval(() => setActive((index) => (index + 1) % reviews.length), 2000);
    return () => clearInterval(timer);
  }, [playing, hovered, focused, inView, pageVisible]);

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
          <div className="grid auto-cols-[100%] grid-flow-col transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${active * 100}%)` }}>
            {reviews.map((review, index) => (
              <article key={review.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${reviews.length}`} aria-hidden={active !== index} inert={active !== index ? "" : undefined} className="min-w-0 p-5 text-left sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><Star size={18} className="fill-primary text-primary" aria-hidden="true" />{review.rating}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug sm:text-2xl">{review.title}</h3>
                {review.quote && <blockquote className="mt-4 flex gap-3 text-lg leading-7"><Quote size={24} className="shrink-0 text-primary" aria-hidden="true" /><p>&quot;{review.quote}&quot;</p></blockquote>}
                <div className="mt-5 flex flex-wrap gap-2">{review.tags.map((tag) => <span key={tag} className="meta-tag">{tag}</span>)}</div>
                <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground"><UserRound size={17} className="text-primary" aria-hidden="true" />Upwork client</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 sm:px-8">
            <div className="flex items-center">{reviews.map((review, index) => <button key={review.id} type="button" aria-label={`Show review ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)} className="flex h-11 w-6 items-center justify-center rounded-md"><span className={`h-2 rounded-full transition-all ${active === index ? "w-4 bg-primary" : "w-2 bg-primary/30"}`} /></button>)}</div>
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
