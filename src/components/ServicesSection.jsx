import {
  ArrowRight,
  BrainCircuit,
  Check,
  AudioLines,
  Plug,
  ExternalLink,
  Workflow,
  Database,
  Webhook,
  Bot,
  Search,
  Sparkles,
} from "lucide-react";
import {
  SiN8N, SiMake, SiElevenlabs, SiDeepgram, SiModelcontextprotocol,
  SiPython, SiFastapi, SiNextdotjs, SiSupabase, SiPostgresql,
  SiLangchain, SiLanggraph, SiGmail, SiGooglesheets, SiTelegram, SiReact,
  SiClaude, SiAnthropic, SiOpenrouter,
} from "react-icons/si";
import { TbBrandOpenai, TbBrandTwilio } from "react-icons/tb";

const technologyIcons = {
  n8n: [SiN8N, "#ea4b71"],
  "Make.com": [SiMake, "#bd66ee"],
  ElevenLabs: [SiElevenlabs, "#b4a0ff"],
  Deepgram: [SiDeepgram, "#13cfa0"],
  MCP: [SiModelcontextprotocol, "#b4a0ff"],
  Python: [SiPython, "#dfb943"],
  FastAPI: [SiFastapi, "#27bba6"],
  "Next.js": [SiNextdotjs, "currentColor"],
  Supabase: [SiSupabase, "#3ecf8e"],
  PostgreSQL: [SiPostgresql, "#669bc6"],
  OpenAI: [TbBrandOpenai, "#49b99c"],
  Gemini: [Sparkles, "#779bf6"],
  Twilio: [TbBrandTwilio, "#ef526d"],
  Vapi: [AudioLines, "#42c9af"],
  Webhooks: [Webhook, "#df9b64"],
  "CRM integrations": [Plug, "#6fa3ee"],
  "Workflow orchestration": [Workflow, "#b492ed"],
  LLMs: [Bot, "#b492ed"],
  RAG: [Search, "#56bacb"],
  Pinecone: [Database, "#57bfa0"],
  "Vector databases": [Database, "#669bc6"],
  "Tool calling": [Plug, "#df9b64"],
  LangChain: [SiLangchain, "#56baa7"],
  LangGraph: [SiLanggraph, "#9ab8ed"],
  Gmail: [SiGmail, "#ea6c61"],
  "Google Sheets": [SiGooglesheets, "#40b67b"],
  Telegram: [SiTelegram, "#4eafe0"],
  React: [SiReact, "#61dafb"],
  Claude: [SiClaude, "#d99a7c"],
  Anthropic: [SiAnthropic, "#d9b9a0"],
  OpenRouter: [SiOpenrouter, "#9aafff"],
};

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
    technologies: ["ElevenLabs", "Twilio", "Vapi", "Deepgram", "OpenAI", "Gemini", "Claude", "OpenRouter"],
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
    technologies: ["n8n", "Make.com", "Webhooks", "MCP", "Tool calling", "Gmail", "Google Sheets", "Telegram", "OpenAI", "Claude"],
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
    technologies: ["OpenAI", "Gemini", "Claude", "Anthropic", "OpenRouter", "LangChain", "LangGraph", "Pinecone", "MCP", "RAG", "Supabase", "PostgreSQL", "Tool calling"],
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
    technologies: ["Python", "FastAPI", "Next.js", "React", "Supabase", "PostgreSQL", "OpenAI", "MCP"],
    bestFor: "Businesses integrating AI into new or existing applications",
  },
];

export const ServicesSection = () => {
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
          <p className="section-description">
            Intelligent agents, voice AI, LLM solutions, and connected automation
            designed around your workflow, users, and business goals.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {[services[1], services[0], services[2], services[3]].map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                aria-labelledby={`${service.id}-title`}
                className="service-row group grid min-w-0 gap-4 px-2 py-5 text-left sm:px-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-8 lg:py-6"
              >
                <div className="min-w-0">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="service-main-icon icon-tile h-12 w-12 shrink-0">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                      Service {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 id={`${service.id}-title`} className="text-lg font-semibold leading-snug md:text-xl">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 py-1 lg:pl-16" aria-label={`${service.title} technologies`}>
                  {service.technologies.map((technology, toolIndex) => {
                    const [TechnologyIcon, color] = technologyIcons[technology];
                    return (
                      <span key={technology} tabIndex={0} aria-label={technology} className="group/technology relative inline-flex h-9 w-9 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <TechnologyIcon className="service-logo-float h-6 w-6" style={{ color, animationDelay: `${toolIndex * -0.6}s` }} aria-hidden="true" />
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground opacity-0 shadow-md transition-opacity group-hover/technology:opacity-100 group-focus/technology:opacity-100">
                          {technology}
                        </span>
                      </span>
                    );
                  })}
                </div>
                </div>

                <div className="min-w-0">
                <p className="mb-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
                <p className="mb-3 text-xs leading-5 text-muted-foreground">
                  <span className="font-semibold text-foreground">Best suited for: </span>
                  {service.bestFor}
                </p>

                <div className="mb-3">
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Typical deliverables
                  </h4>
                  <ul className="space-y-1">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex gap-2 text-sm leading-5 text-muted-foreground"
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

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-3">
                  <a
                    href="#contact"
                    aria-label={`Discuss your project: ${service.title}`}
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-primary/75"
                  >
                    Discuss your project
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                  </a>
                </div>
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
