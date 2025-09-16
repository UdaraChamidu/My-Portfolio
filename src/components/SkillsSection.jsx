import { useState } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const skills = [
  // Web Development
  { name: "HTML", level: 75, category: "Web Development" },
  { name: "CSS", level: 85, category: "Web Development" },
  { name: "JavaScript", level: 84, category: "Web Development" },
  { name: "React", level: 80, category: "Web Development" },
  { name: "Tailwind CSS", level: 71, category: "Web Development" },
  { name: "Express.js", level: 70, category: "Web Development" },
  { name: "Next.js", level: 70, category: "Web Development" },

  // ML / AI
  { name: "ML", level: 93, category: "AI / ML" },
  { name: "DL", level: 87, category: "AI / ML" },
  { name: "NLP", level: 74, category: "AI / ML" },
  { name: "Gen AI", level: 90, category: "AI / ML" },
  { name: "Computer Vision", level: 74, category: "AI / ML" },
  { name: "AI Agents", level: 65, category: "AI / ML" },
  { name: "LLMs", level: 74, category: "AI / ML" },
  { name: "Vector Stores", level: 83, category: "AI / ML" },
  { name: "RAG", level: 87, category: "AI / ML" },
  { name: "n8n", level: 84, category: "AI / ML" },

  // Programming
  { name: "Python", level: 90, category: "Programming" },
  { name: "Java", level: 82, category: "Programming" },
  { name: "C++", level: 85, category: "Programming" },

  // Deployment
  { name: "Docker", level: 70, category: "Deployment" },
  { name: "Flask", level: 70, category: "Deployment" },
  { name: "Streamlit ", level: 85, category: "Deployment" },
  { name: "AWS", level: 75, category: "Deployment" },
  { name: "Railway", level: 75, category: "Deployment" },
  { name: "Vercel", level: 78, category: "Deployment" },  
  { name: "FastAPI", level: 80, category: "Deployment" },
  { name: "Github Actions", level: 70, category: "Deployment" },

  // add databases
  { name: "MySQL", level: 75, category: "databases" },
  { name: "MongoDB", level: 72, category: "databases" },
  { name: "Chromadb", level: 80, category: "databases" },
  { name: "Firebase", level: 78, category: "databases" },
  { name: "FAISS", level: 84, category: "databases" },
 
  // Tools
  { name: "GitHub", level: 85, category: "tools" },
  { name: "Google Colab", level: 95, category: "tools" },
  { name: "VS Code", level: 84, category: "tools" },
  { name: "Jupyter", level: 85, category: "tools" },
  { name: "HuggingFace", level: 82, category: "tools" },
  { name: "Docker", level: 79, category: "tools" },

  // Add other skills as needed
  { name: "Arduino", level: 70, category: "others" },
  { name: "Matlab", level: 78, category: "others" },
  { name: "Solidworks", level: 65, category: "others" },
  { name: "Electronics", level: 72, category: "others" },
  { name: "Databases", level: 82, category: "others" },
  { name: "JIRA", level: 68, category: "others" },
  

];



const categories = [
  "all",
  "AI / ML",
  "Programming",
  "Web Development",
  "Deployment",
  "databases",
  "tools",
  "others",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animatedValues, setAnimatedValues] = useState({}); // store current values

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Animate skill bars and percentage whenever filteredSkills changes
  useEffect(() => {
    const newValues = {};
    filteredSkills.forEach((skill) => {
      newValues[skill.name] = 0;
    });
    setAnimatedValues(newValues);

    filteredSkills.forEach((skill) => {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        setAnimatedValues((prev) => ({
          ...prev,
          [skill.name]: start > skill.level ? skill.level : start,
        }));
        if (start >= skill.level) clearInterval(interval);
      }, 15); // adjust speed here
    });
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-muted-foreground hover:bg-primary/30"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              {/* Skill Name */}
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden relative">
                <div
                  className="bg-primary h-2 rounded-full origin-left relative transition-all duration-300"
                  style={{ width: `${animatedValues[skill.name] || 0}%` }}
                >
                  {/* Glow pulse overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-primary/40 rounded-full animate-pulse-glow" />
                </div>
              </div>

              {/* Skill Percentage */}
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {animatedValues[skill.name] || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.4;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};