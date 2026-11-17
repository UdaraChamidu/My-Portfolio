import { Blocks, BrainCircuit, Workflow } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="section-shell section-band">
      <div className="section-inner max-w-5xl">
        <div className="section-header">
          <p className="section-kicker">Professional Profile</p>
          <h2 className="section-title">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-2 md:gap-9">
          <div className="space-y-4 text-left">
            <h3 className="text-2xl font-semibold leading-tight">
              Building intelligent agents and business automation
            </h3>

            <p className="leading-7 text-muted-foreground">
              Based in Sri Lanka, I work remotely as an AI Automation Engineer
              at Atlantic Bridge Exchange Limited, UK. I also serve international
              clients as a{" "}
              <strong className="font-semibold text-primary">
                Top Rated AI Engineer on Upwork
              </strong>{" "}
              with a{" "}
              <strong className="font-semibold text-foreground">
                100% Job Success Score
              </strong>.
            </p>

            <p className="leading-7 text-muted-foreground">
              I build voice agents, RAG assistants, and automated workflows,
              connecting AI with business knowledge, APIs, and tools through
              MCP. My focus is reliable systems with secure data handling
              and human review where it matters.
            </p>

            <p className="leading-7 text-muted-foreground">
              I am also the founder of Veloxdy and a final-year B.Sc. (Hons)
              Computer Engineering undergraduate at the University of Jaffna.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">
                    AI Agents & Conversational Systems
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Building RAG assistants, voice agents, multimodal tools,
                    and context-aware conversational applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Business Workflow Automation
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Connecting AI, n8n, communication tools, APIs, and business
                    systems with approval and tracking workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <Blocks className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Custom AI Applications & Integrations
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Connecting LLMs, MCP tools, backend APIs, and databases
                    in tailored AI applications for practical business workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
