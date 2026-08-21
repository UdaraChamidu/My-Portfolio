import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  Workflow,
} from "lucide-react";

const services = [
  {
    id: "ai-applications",
    icon: BrainCircuit,
    title: "AI Applications & RAG",
    description:
      "Turn business knowledge, documents, and user requests into useful AI-powered product experiences.",
    deliverables: [
      "RAG and document-question answering systems",
      "Conversational and multimodal AI applications",
      "Secure model, API, and data-source integrations",
    ],
    bestFor: "Knowledge-heavy teams, internal tools, and customer-facing AI products",
  },
  {
    id: "full-stack-development",
    icon: Code2,
    title: "Full-Stack Web Applications",
    description:
      "Build responsive, maintainable web products from validated requirements through deployment.",
    deliverables: [
      "React interfaces and API-driven backends",
      "Authentication, databases, and third-party integrations",
      "Cloud deployment and production handover",
    ],
    bestFor: "Startups, service businesses, operational platforms, and MVPs",
  },
  {
    id: "ai-automation",
    icon: Workflow,
    title: "AI Agents & Business Automation",
    description:
      "Reduce repetitive work with connected workflows that keep people in control of important decisions.",
    deliverables: [
      "n8n workflows and AI-assisted business processes",
      "Email, document, CRM, and external API automation",
      "Human approval, tracking, and failure-handling flows",
    ],
    bestFor: "Teams managing repetitive communication, data entry, and approval processes",
  },
  {
    id: "machine-learning",
    icon: BrainCircuit,
    title: "Machine Learning Solutions",
    description:
      "Develop and integrate prediction or classification capabilities around a clearly defined use case.",
    deliverables: [
      "Data preparation and model development",
      "Prediction and classification interfaces",
      "Model evaluation, API integration, and deployment",
    ],
    bestFor: "Organizations with structured data and a measurable prediction problem",
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
            Focused AI, automation, machine learning, and full-stack engineering
            services designed around your workflow, users, and business goals.
          </p>
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
                  <div>
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
              href="https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              Upwork
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
