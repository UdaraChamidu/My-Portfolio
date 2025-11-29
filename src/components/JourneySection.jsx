import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2012 - 2020",
    title: "High School Era",
    description: (
      <>
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2"><strong>School:</strong> Dhammissara National College, Nattandiya</p>
          <strong className="text-primary">Academic Achievements:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><strong>O/L Exams:</strong> 9 A passes</li>
            <li><strong>A/L Exams:</strong> 3 B passes (Maths Stream: Combined Maths, Physics, Chemistry)</li>
          </ul>
        </div>
        Graduated with Distinction in Mathematics and Science. The spark for problem-solving was lit here.
      </>
    ),
    color: "bg-primary",
  },
  {
    year: "2022",
    title: "Started University",
    description: "Enrolled in BSc Computer Engineering at University of Jaffna. Dive deep into Sftware Engineering, Artificial Intelligence, ML, DL and Mathematics .",
    color: "bg-primary",
  },
  {
    year: "2023",
    title: "Discovered AI",
    description: "Built my first Neural Network. Realized that AI is not just hype, but the future of engineering.",
    color: "bg-primary",
  },
  {
    year: "2024",
    title: "Full Stack & Agents",
    description: "Mastered MERN stack and started building autonomous AI agents using LangChain and n8n.",
    color: "bg-primary",
  },
  {
    year: "Nov 2025",
    title: "Software Engineer Intern",
    description: "Joined Idea8 Pvt Ltd. Applying theory to real-world problems and learning from industry veterans.",
    color: "bg-primary",
  },
];

export const JourneySection = () => {
  return (
    <section id="journey" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My <span className="text-primary">Journey</span>
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex items-center justify-between md:justify-normal w-full",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Spacer for desktop alignment */}
                <div className="hidden md:block w-5/12" />

                {/* Icon/Dot Center */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-background z-10 shadow-lg">
                    <div className={cn("w-full h-full rounded-full shadow-inner", item.color)}>
                    </div>
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-5/12 ml-12 md:ml-0 pl-0 md:px-4">
                  <div className={cn(
                      "p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative",
                      "before:content-[''] before:absolute before:top-6 before:w-4 before:h-4 before:bg-card before:rotate-45 before:border-b before:border-l before:border-inherit",
                      index % 2 === 0 
                        ? "md:before:-left-2 md:before:border-r-0 md:before:border-t-0" // Right side items arrow
                        : "md:before:-right-2 md:before:border-l-0 md:before:border-b-0 md:before:rotate-[225deg]" // Left side items arrow
                  )}>
                    <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3", item.color)}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};