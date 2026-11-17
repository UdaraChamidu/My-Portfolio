import { ExternalLink, MapPin } from "lucide-react";

const experienceList = [
  {
    id: 1,
    role: "AI Automation Engineer",
    company: "Atlantic Bridge Exchange Limited",
    engagementType: "Employment",
    location: "United Kingdom | Remote",
    duration: "May 2026 - Present",
    image: "/Experiances/2.jpg",
    contributions: [
      "Design and develop AI agents and automated business workflows.",
      "Integrate LLMs, APIs, databases, and external services.",
      "Build and maintain AI-powered software and automation solutions.",
    ],
  },
  /* Temporarily hidden. Remove this comment wrapper to restore this role.
  {
    id: 2,
    role: "AI Engineer",
    company: "Technology Center Lanka",
    engagementType: "Professional collaboration",
    location: "Negombo, Sri Lanka | Hybrid",
    duration: "May 2026 - Present",
    image: "/Experiances/2.jpg",
    url: "https://github.com/TechCenterSriLanka",
    contributions: [
      "Contribute to AI, automation, and software engineering initiatives.",
      "Support the development of practical and scalable technology solutions.",
    ],
  },
  */
  {
    id: 3,
    role: "Freelance AI Engineer, AI Automation & Full-Stack Developer",
    company: "Upwork",
    engagementType: "Freelance",
    location: "Remote | International clients",
    duration: "Jan 2026 - Present",
    image: "/Experiances/4.png",
    contributions: [
      "Deliver AI solutions, automation workflows, and API integrations for business clients.",
      "Build full-stack web applications from requirements through deployment.",
    ],
  },
  {
    id: 4,
    role: "Founder / AI Solutions & Web App Developer",
    company: "Veloxdy.com",
    engagementType: "Founder",
    location: "Sri Lanka | Remote",
    duration: "Apr 2026 - Present",
    image: "/Experiances/5.png",
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
    image: "/Experiances/3.png",
    url: "https://www.idea8.us/",
    contributions: [
      "Contributed to software engineering, AI and machine-learning projects during a seven-month internship.",
      "Developed the Lumina AI application and supported SaaS and automation work.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="section-shell section-band">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">Professional Timeline</p>
          <h2 className="section-title">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="section-description">
            Experience in AI automation engineering, international freelance
            client work, building Veloxdy, and AI/ML software engineering.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-2">
          {experienceList.map((exp) => (
            <article
              key={exp.id}
              className="experience-entry surface-card surface-card-interactive h-full p-5 text-left"
            >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="meta-tag border-primary/25 bg-primary/10 text-primary">
                    {exp.engagementType}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                  {exp.duration.includes("Present") && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Current
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-left text-lg font-semibold leading-snug">
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
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-primary">
                        {exp.company}
                      </p>
                    )}

                    <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {exp.location}
                    </p>
                  </div>

                  <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md border border-border bg-white p-1.5 sm:w-24">
                    <img
                      src={exp.image}
                      alt={`${exp.company} logo`}
                      className="company-logo h-full w-full object-contain"
                      loading="lazy"
                      width="144"
                      height="64"
                    />
                  </div>
                </div>

                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-base leading-6 text-muted-foreground">
                  {exp.contributions.map((contribution) => (
                    <li key={contribution} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
