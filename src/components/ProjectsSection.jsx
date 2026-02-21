import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "HR Leave Management System",
    description:
      "A comprehensive solution for tracking employee leaves, WFH requests, announcements, and holidays with real-time updates using Socket.io.",
    image: "/projects/hr-leave.png",
    tags: ["React", "NestJS", "Prisma", "Socket.io", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "https://github.com/UdaraChamidu/HR-Leave-Management-System",
  },
  {
    id: 1,
    title: "Insurance AI Consultant Platform",
    description:
      "A smart video consultation and intake system for insurance agents, featuring intelligent scheduling, compliance checklists, and RAG-integrated knowledge base.",
    image: "/projects/insurance.png",
    tags: ["React", "Supabase", "Prisma", "WebRTC", "Pinecone"],
    demoUrl: "https://insurance-agent-ruby.vercel.app/",
    githubUrl: "https://github.com/UdaraChamidu/Insurance-AI-Consultant",
  },
  {
    id: 1,
    title: "Velox Dynamics",
    description:
      "A high-performance business website and client portal for digital agencies, featuring interactive project tools and a sleek glassmorphism design.",
    image: "/projects/velox.png",
    tags: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://veloxdynamics.vercel.app",
    githubUrl: "https://github.com/UdaraChamidu/Velox-Dynamics-Elite-Engineering-Agency",
  },
  {
    id: 1,
    title: "Lumina AI",
    description:
      "A premium, next-generation chatbot interface featuring a 'Glassmorphism' aesthetic, powered by Gemini AI and integrated with Supabase for secure auth.",
    image: "/projects/lumina.png",
    tags: ["React", "FastAPI", "Gemini AI", "Supabase"],
    demoUrl: "https://phpstack-1409163-6105388.cloudwaysapps.com",
    githubUrl: "https://github.com/UdaraChamidu/Lumina-AI",
  },
  {
    id: 1,
    title: "Level Up Trading Platform",
    description:
      "A professional-grade trade management solution for Crypto traders, featuring real-time performance analytics, risk calculators, and structured journal review.",
    image: "/projects/levelup.png",
    tags: ["React", "PWA", "Tailwind CSS", "ICT Methodology"],
    demoUrl: "https://leveluptrading.vercel.app",
    githubUrl: "https://github.com/UdaraChamidu/Level-Up-Trading-Platform",
  },
  {
    id: 1,
    title: "UniLife - Student Services Hub",
    description:
      "A comprehensive student platform featuring interactive campus maps, real-time messaging, AI-powered assistance, and a marketplace.",
    image: "/projects/unilife.png",
    tags: ["React 19", "TypeScript", "Firebase", "Tailwind CSS"],
    demoUrl: "https://uni-life-services.vercel.app",
    githubUrl: "https://github.com/UdaraChamidu/UniLife-Services",
  },
  {
    id: 1,
    title: "Lanka Yard (LK Yard)",
    description:
      "A digital marketplace and professional directory for Sri Lanka's construction industry, connecting clients with contractors, rentals, and suppliers.",
    image: "/projects/lkyard.png",
    tags: ["React", "Firebase", "Tailwind CSS", "Firestore"],
    demoUrl: "https://lkyard.lk",
    githubUrl: "https://github.com/UdaraChamidu/LK-Yard",
  },
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
    title: "Video Chatty",
    description:
      "Copy and paste the Video URL or upload video file directly and ask questions.",
    image: "/projects/project9.png",
    tags: ["Python", "Gemini", "Streamlit"],
    demoUrl: "https://video-master.streamlit.app/",
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

  {
    id: 1,
    title: "Real-time Waste Detection",
    description:
      "A CNN learning model that detects and classifies waste in real-time using computer vision techniques.",
    image: "/projects/project12.png",
    tags: ["Python", "Yolo", "Flask", "HTML"],
    demoUrl:
      "https://huggingface.co/spaces/UdaraChamidu/Image-Processing-Based-Smart-Waste-Management-System",
    githubUrl: "https://github.com/UdaraChamidu/Image-Processing-Based-Smart-Waste-Management-System",
  },

  {
    id: 1,
    title: "Movie Searching Application",
    description:
      "A movie search web app built using React and The Movie Database (TMDb) API.",
    image: "/projects/project13.png",
    tags: ["React", "CSS", "HTML"],
    demoUrl:
      "https://movie-searching-app-tawny.vercel.app/",
    githubUrl: "https://github.com/UdaraChamidu/Movie-Searching-App",
  },

  {
    id: 1,
    title: "AI Voice Assistant with ElevenLabs and n8n",
    description:
      "Ask questions to your documents using voice. Upload PDFs, speak your question, get spoken answers.",
    image: "/projects/project14.png",
    tags: ["Python", "ElevenLabs", "n8n", "Gemini"],
    githubUrl: "https://github.com/UdaraChamidu/AI-Voice-Assistant-with-ElevenLabs-and-n8n",
  },

  {
    id: 1,
    title: "People Detection & Counting using Computer Vision (Ongoing)",
    description:
      "This project combines multiple computer vision techniques to create a comprehensive people counting system using YOLOv8 for object detection...",
    image: "/projects/people.png",
    tags: ["Python", "YoloV8", "OpenCV"],
    githubUrl: "https://github.com/UdaraChamidu/People-Detection-Counting",
  },

  {
    id: 1,
    title: "Smart Railway Gate Control System with GPS Tracking",
    description:
      "In this group project we were built a Smart Railway Tracking System. This use GPS technology and this product can helpful to reduce many railway accidents.",
    image: "/projects/project15.png",
    tags: ["C++", "ESP32", "GPS"],
    
    githubUrl: "https://github.com/UdaraChamidu/Smart-Railway-Gate-Control-System-with-GPS-Tracking",
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
