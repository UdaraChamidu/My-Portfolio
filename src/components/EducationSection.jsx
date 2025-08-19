import { Book } from "lucide-react";

const educationList = [
  {
    id: 1,
    degree: "B.Sc (Hons) in Computer Engineering",
    institute: "Faculty of Engineering, University of Jaffna",
    duration: "2022 - Present",
    description: "Specializing in AI, Machine Learning, and Deep Learning and more...",
  },
  {
    id: 2,
    degree: "High School Diploma",
    institute: "Dhammissara National College, Nattandiya",
    duration: "2012 - 2020",
    description: "Focus on Mathematics and Science. Graduated with Distinction.",
  },
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          My <span className="text-primary">Education</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="gradient-border p-6 rounded-lg card-hover text-left"
            >
              <div className="flex items-start gap-4 mb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{edu.degree}</h4>
                  <p className="text-muted-foreground">{edu.institute}</p>
                  <p className="text-sm text-muted-foreground">{edu.duration}</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
