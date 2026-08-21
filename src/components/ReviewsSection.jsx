import { BriefcaseBusiness, ExternalLink, Quote, Star } from "lucide-react";

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
  return (
    <section id="reviews" className="section-shell">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">
            Verified Freelance Work
          </p>
          <h2 className="section-title">
            Client <span className="text-primary">Reviews</span>
          </h2>
          <p className="section-description">
            Ratings and feedback from completed and ongoing Upwork contracts.
            Screenshots are included as the original review evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="surface-card surface-card-interactive flex h-full flex-col overflow-hidden text-left"
            >
              <div className="flex h-44 items-center justify-center border-b border-border bg-[#181818] p-3">
                <img
                  src={review.image}
                  alt={`Upwork review evidence for ${review.title}`}
                  className="max-h-full w-full object-contain"
                  loading="lazy"
                  width="960"
                  height="320"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                    {review.rating}
                  </span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>

                <h3 className="text-lg font-semibold leading-6">
                  {review.title}
                </h3>

                {review.quote && (
                  <blockquote className="mt-4 flex gap-3 border-l-2 border-primary pl-4 text-sm italic leading-6 text-muted-foreground">
                    <Quote className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>&quot;{review.quote}&quot;</span>
                  </blockquote>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="meta-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            View Upwork Profile
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
