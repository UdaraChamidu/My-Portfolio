import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Web Development
  { name: "HTML", level: 75, category: "Web Development" },
  { name: "CSS", level: 85, category: "Web Development" },
  { name: "JavaScript", level: 88, category: "Web Development" },
  { name: "React", level: 90, category: "Web Development" },
  { name: "Tailwind CSS", level: 81, category: "Web Development" },

  // ML / AI
  { name: "ML", level: 93, category: "AI / ML" },
  { name: "DL", level: 87, category: "AI / ML" },
  { name: "NLP", level: 80, category: "AI / ML" },
  { name: "Gen AI", level: 90, category: "AI / ML" },
  { name: "Computer Vision", level: 74, category: "AI / ML" },
  { name: "AI Agents", level: 65, category: "AI / ML" },
  { name: "LLMs", level: 74, category: "AI / ML" },
  { name: "VectorStores", level: 80, category: "AI / ML" },
  { name: "RAG", level: 87, category: "AI / ML" },

  // Programming
  { name: "Python", level: 90, category: "Programming" },
  { name: "Java", level: 82, category: "Programming" },
  { name: "C++", level: 85, category: "Programming" },

  // Deployment
  { name: "Docker", level: 40, category: "Deployment" },
  { name: "Flask", level: 70, category: "Deployment" },
  { name: "Streamlit ", level: 70, category: "Deployment" },

  // Tools
  { name: "GitHub", level: 85, category: "tools" },
  { name: "Google Colab", level: 95, category: "tools" },
  { name: "VS Code", level: 84, category: "tools" },
  { name: "Jupyter", level: 85, category: "tools" },
  { name: "HuggingFace", level: 75, category: "tools" },

  // Add other skills as needed
  { name: "Arduino", level: 70, category: "others" },
  { name: "Matlab", level: 78, category: "others" },
  { name: "Solidworks", level: 65, category: "others" },
  { name: "Electronics", level: 72, category: "others" },
  { name: "Databases", level: 85, category: "others" },
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
