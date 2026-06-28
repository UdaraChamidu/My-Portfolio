import { Briefcase } from "lucide-react";

const experienceList = [
  {
    id: 1,
    role: "AI Automation Engineer",
    company: "Atlantic Bridge Exchange Limited, United Kingdom",
    duration: "Jun 2026 - Present",
    description:
      "Building AI automation workflows, intelligent agents, and production-ready systems that connect business processes with modern AI capabilities.",
  },
  {
    id: 2,
    role: "AI/Software Engineering Contributor",
    company: "Technology Center Lanka, Sri Lanka",
    duration: "2026 - Present",
    description:
      "Working on AI, automation, and software engineering initiatives with a focus on practical, scalable technology solutions.",
  },
  {
    id: 3,
    role: "Founder / AI Solutions & Web App Developer",
    company: "Veloxdy.com",
    duration: "2026 - Present",
    description:
      "Building a personal business focused on custom web application development, AI solutions, automation systems, and practical digital products for clients.",
  },
  {
    id: 4,
    role: "AI/ML + Software Engineer Intern",
    company: "Idea8 Pvt Ltd, Kottawa, Sri Lanka",
    duration: "Nov 2025 - May 2026",
    description:
      "Completed an internship working on software engineering projects, AI/ML models, SaaS platforms, and client-focused automation systems.",
  },
];

export const ExperienceSection = () => {
  return (
    
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          My <span className="text-primary">Experiences</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experienceList.map((exp) => (
            <div
              key={exp.id}
              className="gradient-border p-6 rounded-lg card-hover text-left"
            >
              <div className="flex items-start gap-4 mb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{exp.role}</h4>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
