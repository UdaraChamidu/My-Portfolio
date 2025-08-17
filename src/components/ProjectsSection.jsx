import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 3,
    title: "Trip Planner Agent",
    description:
      "An intelligent travel assistant built with FastAPI, LangGraph and OpenAI that answers user questions through agentic reasoning and returns smart, natural responses.",
    image: "/projects/project8.png",
    tags: ["Python", "React", "FastAPI"],
    demoUrl: "#",
    githubUrl:
      "https://github.com/UdaraChamidu/student_attendance_management_project",
  },

  {
    id: 1,
    title: "Legal Document Explainer ",
    description:
      "The AI , Take legal PDF docs as input. It can Summarize simply , Highlight key clauses & risks and Answer specific user questions about the doc. Optionally show confidence or lawyer advice",
    image: "/projects/project11.png",
    tags: ["Python", "Gemini", "FastAPI", "React"],
    demoUrl: "https://ai-legal-doc-explainer-two.vercel.app",
    githubUrl: "https://github.com/UdaraChamidu/AI-Legal-Doc-Explainer",
  },

  {
    id: 1,
    title: "n8n AI Assistant",
    description:
      "Building an AI agent in n8n to automate day to day works.(ongoing)",
    image: "/projects/project5.png",
    tags: ["n8n", "OpenAI", "API"],
    demoUrl:
      "https://www.linkedin.com/posts/udara-herath-530006217_ai-n8n-openai-activity-7346547954507292672-4SaZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADaj23QBzc37-AoJdt04GuyP1DRJf15rN1Y",
    githubUrl:
      "https://github.com/UdaraChamidu/n8n-AI-Agents/blob/main/My_AI_workflow_final.json",
  },

  {
    id: 1,
    title: "Research Project",
    description:
      "Eye Disease Classification with Chatbot Integration (Ongoing Project)",
    image: "/projects/project7.png",
    tags: ["Chatbot", "Python", "Streamlit"],
    demoUrl: "https://huggingface.co/spaces/UdaraChamidu/Eye_Disease_Assistant",
    githubUrl:
      "https://github.com/UdaraChamidu/Eye-Disease-Classification-With-Integrated-Chatbot",
  },

  {
    id: 3,
    title: "AskBot ChatBot",
    description:
      "This is a LangGraph-based chatbot that uses the Gemini 2.5 Flash model via the Gemini API key. The backend is built with Python and FastAPI, and deployed on Railway.",
    image: "/projects/askbot.png",
    tags: ["Python", "React", "FastAPI"],
    demoUrl:
      "https://ask-bot-front-end-git-main-udarachamidus-projects.vercel.app/",
    githubUrl: "https://github.com/UdaraChamidu/AskBot_FrontEnd",
  },

  {
    id: 3,
    title: "Video Master",
    description:
      "Copy and paste the Video URL or upload video file directly and ask questions.",
    image: "/projects/project9.png",
    tags: ["Python", "Gemini", "Streamlit"],
    demoUrl: "video-master.streamlit.app",
    githubUrl: "https://github.com/UdaraChamidu/Video-Master",
  },

  {
    id: 3,
    title: "AskDoc RAG Chatbot",
    description:
      "Upload pdf documents and and ask questions. (Ongoing Project)",
    image: "/projects/project10.png",
    tags: ["Python", "Gemini", "FastAPI"],
    demoUrl: "video-master.streamlit.app",
    githubUrl: "https://github.com/UdaraChamidu/AskDoc-RAG-chatbot-backend",
  },

  {
    id: 1,
    title: "Medical Chatbot",
    description:
      "A medical chat application that enables upload medical images and symptoms to diognisis diseases.",
    image: "/projects/project1.png",
    tags: ["Python", "Groq", "FastAPI"],
    demoUrl: "https://huggingface.co/spaces/UdaraChamidu/Medical-Chatbot",
    githubUrl: "https://github.com/UdaraChamidu/Medical-Chatbot",
  },

  {
    id: 3,
    title: "Attendance Management System",
    description:
      "A web application for managing student attendance, including features for tracking attendance, generating reports, and managing student data.",
    image: "/projects/project3.png",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
    demoUrl: "#",
    githubUrl:
      "https://github.com/UdaraChamidu/student_attendance_management_project",
  },
  {
    id: 2,
    title: "Chat with PDFs",
    description:
      "A RAG based PDF chatbot that allows users to interact with PDF documents using natural language.",
    image: "/projects/project2.png",
    tags: ["Python", "LangChain", "Streamlit"],
    demoUrl: "https://pdfchatty.streamlit.app/",
    githubUrl: "https://github.com/UdaraChamidu/RAG-Based-PDF-Chatbot",
  },

  {
    id: 1,
    title: "Laptop Price Predictor",
    description:
      "A machine learning model that predicts laptop prices based on various features such as brand, processor, RAM, storage and more.",
    image: "/projects/project4.png",
    tags: ["Python", "HTML", "NumPy", "Pandas"],
    demoUrl:
      "https://huggingface.co/spaces/UdaraChamidu/Laptop-Price-Predictor",
    githubUrl: "https://github.com/UdaraChamidu/Laptop-Price-Predictor",
  },
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
