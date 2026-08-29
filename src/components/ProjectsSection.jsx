import { ArrowRight, BookOpen, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  caseStudiesPublic,
  featuredCaseStudyIds,
} from "@/data/caseStudies";

const projects = [
  {
    id: "insurance-ai-consultant",
    title: "Insurance AI Consultant Platform",
    description:
      "An AI-enabled consultation and client-intake platform for insurance professionals, combining video meetings, scheduling, compliance workflows, and a RAG knowledge base.",
    image: "/projects/insurance.png",
    tags: ["React", "Supabase", "WebRTC", "Pinecone"],
    category: "AI",
    workType: "Client project",
    featured: true,
    demoUrl: "https://insurance-agent-ruby.vercel.app/",
  },
  {
    id: "ai-email-automation",
    title: "AI Email Automation System",
    description:
      "A client workflow that monitors Gmail, filters irrelevant messages, creates context-aware draft replies, and records priority, approval, and sending status in an Excel dashboard.",
    image: "/projects/project17.png",
    tags: ["n8n", "Gmail", "Generative AI", "Excel"],
    category: "AI Automation",
    workType: "Client project",
  },
  {
    id: "ai-voice-agent-platform",
    title: "AI Voice Agent Platform",
    description:
      "A production-ready outbound-calling platform with natural real-time conversations, long-term vector memory, automated follow-ups, and a multi-tenant campaign analytics dashboard.",
    image: "/projects/project18.png",
    tags: ["React", "n8n", "Twilio / Vapi", "Pinecone"],
    category: "AI Automation",
    workType: "Professional project",
    featured: true,
  },
  {
    id: "biabot-client-intake",
    title: "BiaBot: AI Client Intake Platform",
    description:
      "A full-stack conversational intake platform that captures client requirements through text or voice, extracts structured data, generates review-ready summaries, and automates internal handoffs to Monday.com.",
    image: "/projects/project19.png",
    tags: ["React", "FastAPI", "OpenAI", "Google Cloud Run"],
    category: "AI",
    workType: "Professional project",
    featured: true,
  },
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "level-up-trading",
    title: "Level Up Trading Platform",
    description:
      "A responsive trade-management platform with performance analytics, risk calculators, structured journaling, and progressive web app support for active traders.",
    image: "/projects/levelup.png",
    tags: ["React", "PWA", "Tailwind CSS", "Analytics"],
    category: "Full Stack",
    workType: "Personal project",
    demoUrl: "https://leveluptrading.vercel.app",
  },
  */
  {
    id: "laptop-price-predictor",
    title: "Laptop Price Predictor",
    description:
      "A deployed machine-learning application that estimates laptop prices from specifications such as brand, processor, memory, storage, and display features.",
    image: "/projects/project4.png",
    tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
    category: "ML / DL",
    workType: "Personal project",
    demoUrl: "https://huggingface.co/spaces/UdaraChamidu/Laptop-Price-Predictor",
    githubUrl: "https://github.com/UdaraChamidu/Laptop-Price-Predictor",
  },
  {
    id: "waste-detection",
    title: "Real-Time Waste Detection",
    description:
      "A computer-vision system that detects and classifies waste from live imagery to support faster and more consistent waste sorting workflows.",
    image: "/projects/project12.png",
    tags: ["Python", "YOLO", "Flask", "Computer Vision"],
    category: "Computer Vision",
    workType: "Academic project",
    demoUrl:
      "https://huggingface.co/spaces/UdaraChamidu/Image-Processing-Based-Smart-Waste-Management-System",
    githubUrl:
      "https://github.com/UdaraChamidu/Image-Processing-Based-Smart-Waste-Management-System",
  },
  {
    id: "smart-railway-gate",
    title: "Smart Railway Gate Control System",
    description:
      "An ESP32-based group project that uses GPS tracking to support automated railway-gate control and reduce accident risk at level crossings.",
    image: "/projects/project15.png",
    tags: ["C++", "ESP32", "GPS", "Embedded Systems"],
    category: "Embedded Systems",
    workType: "Academic project",
    githubUrl:
      "https://github.com/UdaraChamidu/Smart-Railway-Gate-Control-System-with-GPS-Tracking",
  },
  {
    id: "hr-leave-management",
    title: "HR Leave Management System",
    description:
      "A full-stack HR platform for leave and work-from-home requests, company announcements, holidays, and real-time employee updates.",
    image: "/projects/hr-leave.png",
    tags: ["React", "NestJS", "Prisma", "PostgreSQL"],
    category: "Full Stack",
    workType: "Internship work",
    featured: true,
  },
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "veloxdy",
    title: "Veloxdy.com",
    description:
      "The business website for my web application, AI solution, automation, and client-focused digital product services.",
    image: "/projects/velox.png",
    tags: ["React", "Web Development", "AI Services", "Automation"],
    category: "Full Stack",
    workType: "Personal project",
    demoUrl: "https://veloxdy.com",
    githubUrl:
      "https://github.com/UdaraChamidu/Velox-Dynamics-Elite-Engineering-Agency",
  },
  */
  {
    id: "lumina-ai",
    title: "Lumina AI",
    description:
      "A Gemini-powered conversational AI application with a React interface, FastAPI backend, and Supabase authentication and data services.",
    image: "/projects/lumina.png",
    tags: ["React", "FastAPI", "Gemini", "Supabase"],
    category: "AI",
    workType: "Internship work",
    featured: true,
    demoUrl: "https://phpstack-1409163-6105388.cloudwaysapps.com",
    githubUrl: "https://github.com/UdaraChamidu/Lumina-AI",
  },
  {
    id: "unilife",
    title: "UniLife Student Services Hub",
    description:
      "A student-services platform with campus maps, real-time messaging, AI assistance, and a marketplace in one responsive application.",
    image: "/projects/unilife.png",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    category: "Full Stack",
    workType: "Personal project",
    demoUrl: "https://uni-life-services.vercel.app",
  },
  {
    id: "lanka-yard",
    title: "Lanka Yard",
    description:
      "A marketplace and professional directory that connects Sri Lankan construction clients with contractors, equipment rentals, and suppliers.",
    image: "/projects/lkyard.png",
    tags: ["React", "Firebase", "Firestore", "Tailwind CSS"],
    category: "Full Stack",
    workType: "Personal project",
    demoUrl: "https://lkyard.lk",
  },
  {
    id: "trip-planner-agent",
    title: "Trip Planner Agent",
    description:
      "An AI travel assistant built with FastAPI, LangGraph, and OpenAI for conversational trip-planning requests and agent-based response generation.",
    image: "/projects/project8.png",
    tags: ["Python", "LangGraph", "OpenAI", "FastAPI"],
    category: "AI",
    workType: "Personal project",
    githubUrl: "https://github.com/UdaraChamidu/Trip_Planner_Agent",
  },
  {
    id: "legal-document-explainer",
    title: "AI Legal Document Explainer",
    description:
      "An AI document application that summarizes legal PDFs, identifies key clauses and risks, and answers contextual questions without replacing professional legal advice.",
    image: "/projects/project11.png",
    tags: ["Python", "Gemini", "FastAPI", "React"],
    category: "AI",
    workType: "Personal project",
    demoUrl: "https://ai-legal-doc-explainer-two.vercel.app",
    githubUrl: "https://github.com/UdaraChamidu/AI-Legal-Doc-Explainer",
  },
  {
    id: "n8n-ai-assistant",
    title: "n8n AI Assistant",
    description:
      "An ongoing AI-agent workflow that connects language models and external APIs to automate recurring day-to-day tasks.",
    image: "/projects/project5.png",
    tags: ["n8n", "OpenAI", "APIs", "Automation"],
    category: "AI Automation",
    workType: "Personal project",
    status: "Ongoing",
    demoUrl:
      "https://www.linkedin.com/posts/udara-herath-530006217_ai-n8n-openai-activity-7346547954507292672-4SaZ",
    githubUrl:
      "https://github.com/UdaraChamidu/Zenra---n8n_AI_Agents/blob/main/My_AI_workflow_final.json",
  },
  {
    id: "eye-disease-assistant",
    title: "Eye Disease Classification & Assistant",
    description:
      "An ongoing research project that combines eye-disease image classification with a conversational assistant for accessible result exploration.",
    image: "/projects/project7.png",
    tags: ["Python", "Deep Learning", "Streamlit", "Chatbot"],
    category: "Computer Vision",
    workType: "Academic research",
    status: "Ongoing research",
    demoUrl: "https://huggingface.co/spaces/UdaraChamidu/Eye_Disease_Assistant",
    githubUrl:
      "https://github.com/UdaraChamidu/Eye-Disease-Classification-With-Integrated-Chatbot",
  },
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "askbot",
    title: "AskBot",
    description:
      "A LangGraph-based conversational AI application using Gemini, a FastAPI backend, and a React frontend deployed as separate services.",
    image: "/projects/askbot.png",
    tags: ["Python", "LangGraph", "FastAPI", "React"],
    category: "AI",
    workType: "Personal project",
    demoUrl:
      "https://ask-bot-front-end-git-main-udarachamidus-projects.vercel.app/",
    githubUrl: "https://github.com/UdaraChamidu/AskBot_FrontEnd",
  },
  {
    id: "video-chatty",
    title: "Video Chatty",
    description:
      "A multimodal AI application that accepts a video URL or uploaded video and answers questions about its content.",
    image: "/projects/project9.png",
    tags: ["Python", "Gemini", "Streamlit", "Multimodal AI"],
    category: "AI",
    workType: "Personal project",
    githubUrl: "https://github.com/UdaraChamidu/Video-Chatty",
  },
  {
    id: "askdoc-rag",
    title: "AskDoc RAG Chatbot",
    description:
      "An ongoing RAG application for uploading PDF documents and asking grounded natural-language questions about their contents.",
    image: "/projects/project10.png",
    tags: ["Python", "Gemini", "FastAPI", "RAG"],
    category: "AI",
    workType: "Personal project",
    status: "Ongoing",
    githubUrl: "https://github.com/UdaraChamidu/AskDoc-RAG-chatbot-backend",
  },
  */
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "medical-chatbot",
    title: "Medical Image Assistant",
    description:
      "A multimodal prototype that combines uploaded medical images and symptom descriptions to produce an AI-assisted informational response.",
    image: "/projects/project1.png",
    tags: ["Python", "Groq", "FastAPI", "Multimodal AI"],
    category: "Computer Vision",
    workType: "Personal project",
    demoUrl: "https://huggingface.co/spaces/UdaraChamidu/Medical-Chatbot",
    githubUrl: "https://github.com/UdaraChamidu/Medical-Chatbot",
  },
  */
  {
    id: "attendance-management",
    title: "Attendance Management System",
    description:
      "A web application for recording student attendance, maintaining student information, and generating attendance reports.",
    image: "/projects/project3.png",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
    category: "Full Stack",
    workType: "Academic project",
    githubUrl:
      "https://github.com/UdaraChamidu/student_attendance_management_project",
  },
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "pdf-rag-chatbot",
    title: "Chat with PDFs",
    description:
      "A RAG-based application that lets users upload PDF documents and ask grounded questions using natural language.",
    image: "/projects/project2.png",
    tags: ["Python", "LangChain", "Streamlit", "RAG"],
    category: "AI",
    workType: "Personal project",
    githubUrl: "https://github.com/UdaraChamidu/PDF_Chatty-RAG_Chatbot",
  },
  {
    id: "movie-search",
    title: "Movie Search Application",
    description:
      "A responsive React application for searching and exploring movie information through The Movie Database API.",
    image: "/projects/project13.png",
    tags: ["React", "REST API", "CSS", "TMDB"],
    category: "Full Stack",
    workType: "Personal project",
    demoUrl: "https://movie-searching-app-tawny.vercel.app/",
    githubUrl: "https://github.com/UdaraChamidu/Movie-Searching-App",
  },
  */
  {
    id: "ai-voice-assistant",
    title: "AI Voice Assistant",
    description:
      "A document assistant that accepts spoken questions and returns spoken, context-aware answers using n8n, Gemini, and ElevenLabs.",
    image: "/projects/project14.png",
    tags: ["n8n", "Gemini", "ElevenLabs", "Voice AI"],
    category: "AI Automation",
    workType: "Personal project",
    githubUrl:
      "https://github.com/UdaraChamidu/AI-Voice-Assistant-with-ElevenLabs-and-n8n",
  },
  /* Temporarily hidden. Remove this comment wrapper to restore the project.
  {
    id: "people-detection-counting",
    title: "People Detection & Counting",
    description:
      "An ongoing computer-vision system using YOLOv8 and OpenCV to detect people and estimate counts from image or video streams.",
    image: "/projects/people.png",
    tags: ["Python", "YOLOv8", "OpenCV", "Object Detection"],
    category: "Computer Vision",
    workType: "Personal project",
    status: "Ongoing",
    githubUrl: "https://github.com/UdaraChamidu/People-Detection-Counting",
  },
  */
];

const categories = [
  "Featured",
  "AI",
  "AI Automation",
  "ML / DL",
  "Computer Vision",
  "Full Stack",
  "Embedded Systems",
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Featured");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "Featured"
      ? project.featured
      : project.category === activeCategory
  );

  return (
    <section id="projects" className="section-shell">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">Selected Engineering Work</p>
          <h2 className="section-title">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="section-description">
            Explore AI, automation, machine learning, computer vision,
            full-stack, and embedded systems work by category.
          </p>
        </div>

        <div
          className="mb-10 flex flex-wrap justify-center gap-2 md:mb-12"
          aria-label="Project categories"
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="surface-card surface-card-interactive group flex h-full flex-col overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden bg-secondary/20">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="640"
                  height="360"
                />
                <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="absolute right-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  {project.workType}
                </span>
              </div>

              <div className="p-5 flex flex-1 flex-col text-left">
                {project.status && (
                  <p className="mb-2 text-xs font-semibold uppercase text-primary">
                    {project.status}
                  </p>
                )}
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-6 mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.id}-${tag}`}
                    className="meta-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {((caseStudiesPublic &&
                  featuredCaseStudyIds.includes(project.id)) ||
                  project.demoUrl ||
                  project.githubUrl) && (
                  <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4">
                    {caseStudiesPublic &&
                      featuredCaseStudyIds.includes(project.id) && (
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/75"
                      >
                        <BookOpen size={16} aria-hidden="true" />
                        View case study
                      </Link>
                      )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/75"
                      >
                        <ExternalLink size={16} />
                        View project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary"
                      >
                        <Github size={16} />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            className="button-secondary mx-auto w-fit"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/UdaraChamidu"
          >
            View GitHub Profile <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
