import { useState } from "react";
import {
  Bot,
  BrainCircuit,
  CircuitBoard,
  Database,
  Eye,
  GitBranch,
  HardDrive,
  Languages,
  Network,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiArduino,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGithub,
  SiGithubactions,
  SiGooglecolab,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJira,
  SiJupyter,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiRailway,
  SiReact,
  SiStreamlit,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Machine Learning", category: "AI & Automation", icon: BrainCircuit, core: true },
  { name: "Deep Learning", category: "AI & Automation", icon: Network },
  { name: "Natural Language Processing", category: "AI & Automation", icon: Languages },
  { name: "Generative AI", category: "AI & Automation", icon: Sparkles, core: true },
  { name: "Computer Vision", category: "AI & Automation", icon: Eye },
  { name: "AI Agents", category: "AI & Automation", icon: Bot, core: true },
  { name: "Large Language Models", category: "AI & Automation", icon: BrainCircuit },
  { name: "Vector Stores", category: "AI & Automation", icon: Database },
  { name: "RAG", category: "AI & Automation", icon: Search, core: true },
  { name: "n8n", category: "AI & Automation", icon: Workflow, core: true },

  { name: "Python", category: "Programming", icon: SiPython, core: true },
  { name: "Java", category: "Programming", icon: FaJava },
  { name: "C++", category: "Programming", icon: SiCplusplus },

  { name: "HTML", category: "Web Development", icon: SiHtml5 },
  { name: "CSS", category: "Web Development", icon: SiCss },
  { name: "JavaScript", category: "Web Development", icon: SiJavascript, core: true },
  { name: "React", category: "Web Development", icon: SiReact, core: true },
  { name: "Tailwind CSS", category: "Web Development", icon: SiTailwindcss },
  { name: "Express.js", category: "Web Development", icon: SiExpress },
  { name: "Next.js", category: "Web Development", icon: SiNextdotjs },

  { name: "Docker", category: "Cloud & Deployment", icon: SiDocker, core: true },
  { name: "Flask", category: "Cloud & Deployment", icon: SiFlask },
  { name: "Streamlit", category: "Cloud & Deployment", icon: SiStreamlit },
  { name: "AWS", category: "Cloud & Deployment", icon: FaAws },
  { name: "Railway", category: "Cloud & Deployment", icon: SiRailway },
  { name: "Vercel", category: "Cloud & Deployment", icon: SiVercel },
  { name: "FastAPI", category: "Cloud & Deployment", icon: SiFastapi, core: true },
  { name: "GitHub Actions", category: "Cloud & Deployment", icon: SiGithubactions },

  { name: "MySQL", category: "Data", icon: SiMysql, core: true },
  { name: "MongoDB", category: "Data", icon: SiMongodb },
  { name: "ChromaDB", category: "Data", icon: Database },
  { name: "Firebase", category: "Data", icon: SiFirebase },
  { name: "FAISS", category: "Data", icon: HardDrive },

  { name: "GitHub", category: "Tools & Engineering", icon: SiGithub },
  { name: "Google Colab", category: "Tools & Engineering", icon: SiGooglecolab },
  { name: "VS Code", category: "Tools & Engineering", icon: VscVscode },
  { name: "Jupyter", category: "Tools & Engineering", icon: SiJupyter },
  { name: "Hugging Face", category: "Tools & Engineering", icon: SiHuggingface },
  { name: "Arduino", category: "Tools & Engineering", icon: SiArduino },
  { name: "MATLAB", category: "Tools & Engineering", icon: CircuitBoard },
  { name: "SolidWorks", category: "Tools & Engineering", icon: CircuitBoard },
  { name: "Electronics", category: "Tools & Engineering", icon: CircuitBoard },
  { name: "Git", category: "Tools & Engineering", icon: GitBranch },
  { name: "Jira", category: "Tools & Engineering", icon: SiJira },
];

const categories = [
  "Core",
  "AI & Automation",
  "Programming",
  "Web Development",
  "Cloud & Deployment",
  "Data",
  "Tools & Engineering",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Core");

  const filteredSkills = skills.filter((skill) =>
    activeCategory === "Core" ? skill.core : skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Technical <span className="text-primary">Capabilities</span>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
          Technologies and engineering practices used across AI automation,
          full-stack development, data systems, and deployment.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          aria-label="Skill categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "px-4 py-2 rounded-md transition-colors duration-200 font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="group flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-4 opacity-0 shadow-xs animate-[skill-enter_450ms_ease-out_forwards] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:hover:translate-y-0"
                style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}
              >
                <Icon
                  className="h-9 w-9 text-primary transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="text-center text-sm font-semibold leading-5">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
