import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Web Development
  { name: "HTML", level: 95, category: "Web Development" },
  { name: "CSS", level: 90, category: "Web Development" },
  { name: "JavaScript", level: 90, category: "Web Development" },
  { name: "React", level: 90, category: "Web Development" },
  { name: "Tailwind CSS", level: 90, category: "Web Development" },
  { name: "Next.js", level: 80, category: "Web Development" },

  // ML / AI
  { name: "ML", level: 80, category: "AI / ML" },
  { name: "DL", level: 75, category: "AI / ML" },
  { name: "NLP", level: 70, category: "AI / ML" },
  { name: "LLM", level: 65, category: "AI / ML" },
  { name: "Gen AI", level: 60, category: "AI / ML" },
  { name: "Computer Vision", level: 60, category: "AI / ML" },
  { name: "AI Agents", level: 60, category: "AI / ML" },
  { name: "LLMs", level: 60, category: "AI / ML" },
  { name: "VectorStores", level: 60, category: "AI / ML" },
  { name: "RAG", level: 60, category: "AI / ML" },

  // Programming
  { name: "Python", level: 90, category: "Programming" },
  { name: "Java", level: 70, category: "Programming" },
  { name: "C++", level: 85, category: "Programming" },
  { name: "Databases", level: 85, category: "Programming" },

  // Deployment
  { name: "Docker", level: 70, category: "Deployment" },
  { name: "Flask", level: 70, category: "Deployment" },
  { name: "Streamlit ", level: 70, category: "Deployment" },

  // Tools
  { name: "GitHub", level: 90, category: "tools" },
  { name: "Google Colab", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Jupyter", level: 95, category: "tools" },
  { name: "HuggingFace", level: 95, category: "tools" },

  // Add other skills as needed
  { name: "Arduino", level: 90, category: "others" },
  { name: "Matlab", level: 85, category: "others" },
  { name: "Solidworks", level: 95, category: "others" },
  { name: "Electronics", level: 95, category: "others" },
  { name: "Databases", level: 95, category: "others" },
];

const categories = [
  "all",
  "AI / ML",
  "Programming",
  "Web Development",
  "Deployment",
  "tools",
  "others",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
