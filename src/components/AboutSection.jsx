import { Briefcase, Code, User } from "lucide-react";

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
              remote collaboration.
            </p>

            <p className="leading-7 text-muted-foreground">
              My work combines applied AI, automation, and full-stack
              engineering. I focus on translating business requirements into
              maintainable systems with thoughtful human oversight, reliable
              integrations, and clear deployment paths.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">SaaS Development</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Building scalable, multi-tenant software-as-a-service
                    platforms with modern tech stacks.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Machine Learning & Deep Learning
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Building prediction, classification, NLP, and computer
                    vision solutions with deployment-ready interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card surface-card-interactive p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Generative & Agentic AI
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Creating RAG systems, AI agents, voice workflows, and
                    business automation pipelines with modern LLM tooling.
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
