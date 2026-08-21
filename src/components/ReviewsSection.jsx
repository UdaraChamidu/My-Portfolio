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
    <section id="reviews" className="relative px-4 py-24 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-primary">
            Verified Freelance Work
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Client <span className="text-primary">Reviews</span>
          </h2>
          <p className="leading-7 text-muted-foreground">
            Ratings and feedback from completed and ongoing Upwork contracts.
            Screenshots are included as the original review evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
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
                    <span>“{review.quote}”</span>
                  </blockquote>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-secondary/60 px-2 py-1 text-xs font-medium text-secondary-foreground"
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
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-medium transition-colors hover:border-primary/50 hover:text-primary"
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
