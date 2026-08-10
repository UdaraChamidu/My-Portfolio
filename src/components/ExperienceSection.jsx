import { ExternalLink, MapPin } from "lucide-react";

const experienceList = [
  {
    id: 1,
    role: "AI Automation Engineer",
    company: "Atlantic Bridge Exchange Limited",
    engagementType: "Employment",
    location: "United Kingdom | Remote",
    duration: "Jun 2026 - Present",
    contributions: [
      "Build AI automation workflows and intelligent agents for practical business processes.",
      "Develop and integrate production-oriented AI and software systems.",
    ],
  },
  {
    id: 2,
    role: "AI/Software Engineering Contributor",
    company: "Technology Center Lanka",
    engagementType: "Professional collaboration",
    location: "Sri Lanka",
    duration: "2026 - Present",
    contributions: [
      "Contribute to AI, automation, and software engineering initiatives.",
      "Support the development of practical and scalable technology solutions.",
    ],
  },
  {
    id: 3,
    role: "Freelance AI Engineer, AI Automation & Full-Stack Developer",
    company: "Upwork",
    engagementType: "Freelance",
    location: "Remote | International clients",
    duration: "2026 - Present",
    contributions: [
      "Deliver AI solutions, automation workflows, and API integrations for business clients.",
      "Build full-stack web applications from requirements through deployment.",
    ],
    url: "https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share",
  },
  {
    id: 4,
    role: "Founder / AI Solutions & Web App Developer",
    company: "Veloxdy.com",
    engagementType: "Founder",
    location: "Sri Lanka | Remote",
    duration: "2026 - Present",
    contributions: [
      "Lead a personal business focused on web applications, AI solutions, and automation systems.",
      "Translate client requirements into practical digital products and technical solutions.",
    ],
    url: "https://veloxdy.com",
  },
  {
    id: 5,
    role: "AI/ML + Software Engineer Intern",
    company: "Idea8 Pvt Ltd",
    engagementType: "Internship",
    location: "Kottawa, Sri Lanka",
    duration: "Nov 2025 - May 2026",
    contributions: [
      "Contributed to software engineering, AI and machine-learning projects during a seven-month internship.",
      "Developed the Lumina AI application and supported SaaS and automation work.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Current roles span employment, professional collaboration,
            freelance client work, and building Veloxdy.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[181px]"
            aria-hidden="true"
          />

          <div className="space-y-12">
          {experienceList.map((exp) => (
            <article
              key={exp.id}
              className="relative grid grid-cols-[16px_minmax(0,1fr)] gap-x-5 md:grid-cols-[160px_16px_minmax(0,1fr)] md:gap-x-5"
            >
              <p className="col-start-2 mb-3 text-sm font-medium text-muted-foreground md:col-start-1 md:row-start-1 md:mb-0 md:pt-0.5 md:text-right">
                {exp.duration}
              </p>

              <span
                className="col-start-1 row-start-1 mt-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary md:col-start-2"
                aria-hidden="true"
              />

              <div className="col-start-2 text-left md:col-start-3 md:row-start-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {exp.engagementType}
                  </span>
                  {exp.duration.includes("Present") && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Current
                    </span>
                  )}
                </div>

                <h3 className="text-left text-xl font-semibold leading-snug md:text-2xl">
                  {exp.role}
                </h3>
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/75"
                  >
                    {exp.company}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="mt-1 font-medium text-foreground/80">
                    {exp.company}
                  </p>
                )}

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {exp.location}
                </p>

                <ul className="mt-5 max-w-2xl space-y-2 text-base leading-7 text-muted-foreground">
                  {exp.contributions.map((contribution) => (
                    <li key={contribution} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
