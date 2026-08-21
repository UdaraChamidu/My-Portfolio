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

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5 text-left">
            <h3 className="text-2xl font-semibold leading-tight">
              Engineering practical AI and software products
            </h3>

            <p className="leading-7 text-muted-foreground">
              I am a final-year B.Sc. (Hons) Computer Engineering undergraduate
              at the University of Jaffna, based in Sri Lanka and available for
              remote collaboration. I am also a Top Rated Upwork professional
              with a 100% Job Success Score across AI and software engineering
              engagements.
            </p>

            <p className="leading-7 text-muted-foreground">
              My strongest work sits at the intersection of conversational AI,
              business automation, and full-stack product engineering. I build
              AI agents, RAG applications, voice workflows, client-intake
              systems, and SaaS platforms that connect models with real
              operational tools and data.
            </p>

            <p className="leading-7 text-muted-foreground">
              I approach projects as complete systems rather than isolated AI
              demos: clear user workflows, maintainable APIs, secure data
              handling, human review where decisions matter, and practical
              deployment for continued use.
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
                    Full-Stack AI Products
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Delivering responsive React applications, backend APIs,
                    databases, authentication, integrations, and cloud
                    deployment as one maintainable product.
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
