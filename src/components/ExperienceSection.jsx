import { Briefcase } from "lucide-react";

const experienceList = [
  {
    id: 1,
    role: "AI/ML + Software Engineer Intern",
    company: "Idea8 Pvt Ltd, Kottawa, Sri Lanka",
    duration: "Nov 2025 - Present",
    description: "Worked on Software Engineering projects and AI/ML models for various clients.",
  },
  
];

export const ExperienceSection = () => {
  return (
    
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          My <span className="text-primary">Experiences</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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