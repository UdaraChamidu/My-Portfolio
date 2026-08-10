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
    <section id="services" className="relative px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-primary">
            Engineering Services
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Practical Solutions for <span className="text-primary">Real Work</span>
          </h2>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
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
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg md:p-7"
              >
                <div className="mb-5 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              Upwork
            </a>
            <a
              href="https://veloxdy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-medium transition-colors hover:border-primary/50 hover:text-primary"
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
