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
  AudioLines,
  Phone,
  Mic,
  Volume2,
  Webhook,
  Plug,
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
  SiN8N,
  SiPython,
  SiRailway,
  SiReact,
  SiStreamlit,
  SiTailwindcss,
  SiVercel,
  SiElevenlabs,
  SiDeepgram,
  SiMake,
  SiLangchain,
  SiLanggraph,
  SiModelcontextprotocol,
  SiSupabase,
  SiPostgresql,
  SiClaude,
} from "react-icons/si";
import { TbBrandOpenai, TbBrandTwilio } from "react-icons/tb";
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
  { name: "n8n", category: "AI & Automation", icon: SiN8N, core: true },
  { name: "Make.com", category: "AI & Automation", icon: SiMake, core: true },
  { name: "Webhooks", category: "AI & Automation", icon: Webhook },
  { name: "REST APIs", category: "AI & Automation", icon: Plug },
  { name: "MCP", category: "AI & Automation", icon: SiModelcontextprotocol, core: true },
  { name: "Tool Calling", category: "AI & Automation", icon: Plug },
  { name: "OpenAI", category: "AI & Automation", icon: TbBrandOpenai, core: true },
  { name: "Gemini", category: "AI & Automation", icon: Sparkles },
  { name: "Claude", category: "AI & Automation", icon: SiClaude },
  { name: "LangChain", category: "AI & Automation", icon: SiLangchain },
  { name: "LangGraph", category: "AI & Automation", icon: SiLanggraph, core: true },

  { name: "Voice Agents", category: "Voice AI", icon: AudioLines, core: true },
  { name: "ElevenLabs", category: "Voice AI", icon: SiElevenlabs },
  { name: "Twilio", category: "Voice AI", icon: TbBrandTwilio },
  { name: "Vapi", category: "Voice AI", icon: Phone },
  { name: "Deepgram", category: "Voice AI", icon: SiDeepgram },
  { name: "Speech-to-Text", category: "Voice AI", icon: Mic },
  { name: "Text-to-Speech", category: "Voice AI", icon: Volume2 },
  { name: "WebRTC", category: "Voice AI", icon: Network },

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
  { name: "Supabase", category: "Data", icon: SiSupabase },
  { name: "PostgreSQL", category: "Data", icon: SiPostgresql },
  { name: "Pinecone", category: "Data", icon: Database },

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
  "Voice AI",
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
    <section id="skills" className="section-shell">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">Engineering Toolkit</p>
          <h2 className="section-title">
            Technical <span className="text-primary">Capabilities</span>
          </h2>
          <p className="section-description">
            Technologies and engineering practices used across AI automation,
            full-stack development, data systems, and deployment.
          </p>
        </div>

        <div
          className="mb-6 flex flex-wrap justify-center gap-2 md:mb-7"
          aria-label="Skill categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "filter-control",
                activeCategory === category
                  ? "filter-control-active"
                  : ""
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          key={activeCategory}
          className="skill-logo-grid grid grid-cols-3 gap-x-4 gap-y-6 py-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="group flex min-w-0 flex-col items-center gap-3"
              >
                <span
                  className="skill-logo-float flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background/80 text-primary shadow-sm"
                  style={{
                    animationDelay: `${index * -0.65}s`,
                  }}
                >
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="text-center text-xs font-medium leading-5 text-foreground/80 sm:text-sm">
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
