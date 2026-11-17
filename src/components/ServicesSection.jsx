import {
  ArrowRight,
  BrainCircuit,
  Check,
  AudioLines,
  Plug,
  ExternalLink,
  Pause,
  Play,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: "voice-conversational-ai",
    icon: AudioLines,
    title: "AI Voice Agents & Conversational AI",
    description:
      "Build intelligent voice and conversational agents for business communication, from inbound and outbound calls to customer support and human handoffs.",
    deliverables: [
      "Inbound and outbound voice agents",
      "Lead qualification, customer support, and appointment scheduling",
      "Context-aware conversations and human handoffs",
    ],
    technologies: ["ElevenLabs", "Twilio", "Vapi", "Deepgram", "OpenAI", "API integrations"],
    bestFor: "Sales, support, and appointment-based businesses",
  },
  {
    id: "ai-automation",
    icon: Workflow,
    title: "AI Workflow Automation",
    description:
      "Connect applications, eliminate repetitive tasks, and streamline operations through intelligent decisions and integrated business workflows.",
    deliverables: [
      "n8n and Make.com workflow orchestration",
      "CRM, email, intake, and application integrations",
      "Decision logic, human approvals, and automated follow-ups",
    ],
    bestFor: "Teams managing repetitive communication, intake, data entry, and approvals",
    technologies: ["n8n", "Make.com", "REST APIs", "Webhooks", "CRM integrations", "Workflow orchestration"],
  },
  {
    id: "agentic-ai-llm",
    icon: BrainCircuit,
    title: "Agentic AI & LLM Solutions",
    description:
      "Develop intelligent agents, knowledge-based assistants, and RAG systems that access information, use tools, and perform multi-step tasks.",
    deliverables: [
      "Knowledge assistants and retrieval-augmented generation",
      "Agent workflows with tool calling and multi-step reasoning",
      "MCP, vector databases, and business knowledge integration",
    ],
    technologies: ["OpenAI", "Gemini", "LLMs", "RAG", "Pinecone", "Vector databases", "MCP", "Tool calling"],
    bestFor: "Teams building knowledge assistants and tool-connected AI agents",
  },
  {
    id: "custom-ai-integrations",
    icon: Plug,
    title: "Custom AI Solutions & Integrations",
    description:
      "Build tailored AI-powered business applications and connect AI capabilities with existing systems, databases, and communication platforms.",
    deliverables: [
      "Custom AI applications and backend services",
      "Database, API, and communication-platform integrations",
      "AI capabilities embedded into existing business systems",
    ],
    technologies: ["Python", "FastAPI", "Next.js", "Supabase", "PostgreSQL", "APIs", "AI integrations"],
    bestFor: "Businesses integrating AI into new or existing applications",
  },
];

export const ServicesSection = () => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isPaused && !motionPreference.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.2 });
    const handleMotionChange = () => {
      if (motionPreference.matches) video.pause();
    };
    observer.observe(video);
    motionPreference.addEventListener("change", handleMotionChange);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", handleMotionChange);
      video.pause();
    };
  }, [isPaused]);

  const toggleAnimation = () => {
    if (isPlaying) {
      setIsPaused(true);
      videoRef.current.pause();
    } else {
      setIsPaused(false);
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="services" className="section-shell section-band">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-kicker">
            Engineering Services
          </p>
          <h2 className="section-title">
            Practical Solutions for <span className="text-primary">Real Work</span>
          </h2>
        </div>

        <div className="mb-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <p className="mx-auto max-w-2xl text-center text-lg leading-8 text-muted-foreground lg:mx-0 lg:text-left">
            Intelligent agents, voice AI, LLM solutions, and connected automation
            designed around your workflow, users, and business goals.
          </p>
          <div className="relative mx-auto w-full max-w-80 overflow-hidden rounded-lg">
            <video
              ref={videoRef}
              className="aspect-video w-full object-contain"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Services animation"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/animations/sd_watermarked_preview.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggleAnimation}
              className="icon-button absolute bottom-2 right-2 bg-background/90"
              aria-label={isPlaying ? "Pause services animation" : "Play services animation"}
              title={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="surface-card surface-card-interactive group flex h-full flex-col p-6 text-left md:p-7"
              >
                <div className="mb-5 flex items-start gap-4">
                  <span className="icon-tile h-12 w-12 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                      Service
                    </p>
                    <h3 className="text-xl font-semibold leading-snug md:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="mb-6 leading-7 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Typical deliverables
                  </h4>
                  <ul className="space-y-3">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
                  {service.technologies.map((technology) => (
                    <span key={technology} className="meta-tag">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-auto border-t border-border pt-5">
                  <p className="mb-4 text-sm leading-6">
                    <span className="font-semibold text-foreground">
                      Best suited for:
                      {" "}
                    </span>
                    <span className="text-muted-foreground">
                      {service.bestFor}
                    </span>
                  </p>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/75"
                  >
                    View related projects
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-border pt-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl font-semibold">Have a project in mind?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share the problem, current workflow, and outcome you want to achieve.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <a
              href="#contact"
              className="button-primary"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://veloxdy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Veloxdy
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
