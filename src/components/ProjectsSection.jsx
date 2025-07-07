import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Medical Chatbot",
    description: "A medical chat application that enables upload medical images and symptoms to diognisis diseases.",
    image: "/projects/project1.png",
    tags: ["Python", "Groq", "FastAPI"],
    demoUrl: "https://www.linkedin.com/posts/udara-herath-530006217_ai-machinelearning-healthcareinnovation-activity-7337763371116654592-B8ek?utm_source=share&utm_medium=member_desktop&rcm=ACoAADaj23QBzc37-AoJdt04GuyP1DRJf15rN1Y",
    githubUrl: "https://github.com/UdaraChamidu/Medical-Chatbot",
  },

  {
    id: 3,
    title: "Attendance Management System",
    description:
      "A web application for managing student attendance, including features for tracking attendance, generating reports, and managing student data.",
    image: "/projects/project3.png",
    tags: ["PHP", "MySQL","HTML", "CSS", "JavaScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/UdaraChamidu/student_attendance_management_project",
  },
  {
    id: 2,
    title: "Chat with PDFs",
    description:
      "A RAG based PDF chatbot that allows users to interact with PDF documents using natural language.",
    image: "/projects/project2.png",
    tags: ["Python", "LangChain", "Streamlit"],
    demoUrl: "https://www.linkedin.com/posts/udara-herath-530006217_ai-chatwithpdf-pdaflag-activity-7337730822373855233-3k1K?utm_source=share&utm_medium=member_desktop&rcm=ACoAADaj23QBzc37-AoJdt04GuyP1DRJf15rN1Y",
    githubUrl: "https://github.com/UdaraChamidu/RAG-Based-PDF-Chatbot",
  },
  
  {
    id: 1,
    title: "Laptop Price Predictor",
    description: "A machine learning model that predicts laptop prices based on various features such as brand, processor, RAM, storage and more.",
    image: "/projects/project4.png",
    tags: ["Python", "HTML", "NumPy", "Pandas", "Scikit learn"],
    demoUrl: "https://www.linkedin.com/posts/udara-herath-530006217_machinelearning-ai-datascience-activity-7337062576368824320-_5UL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADaj23QBzc37-AoJdt04GuyP1DRJf15rN1Y",
    githubUrl: "https://github.com/UdaraChamidu/Laptop-Price-Predictor",
  },

  {
    id: 1,
    title: "Personal AI Assistant",
    description: "Building an AI agent in n8n to automate day to day works.(ongoing)",
    image: "/projects/project5.png",
    tags: ["n8n", "OpenAI", "API"],
    demoUrl: "https://www.linkedin.com/posts/udara-herath-530006217_ai-n8n-openai-activity-7346547954507292672-4SaZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADaj23QBzc37-AoJdt04GuyP1DRJf15rN1Y",
    githubUrl: "https://github.com/UdaraChamidu/n8n-AI-Agents/blob/main/My_AI_workflow_final.json",
  },

  {
    id: 1,
    title: "Research Project",
    description: "Eye Disease Classification with Chatbot Integration (ongoing)",
    image: "/projects/project6.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/UdaraChamidu"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
