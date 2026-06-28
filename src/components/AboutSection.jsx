import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              AI Automation Engineer | SaaS Developer | Freelancer
            </h3>

            <p className="text-muted-foreground">
              Passionate about Generative AI, Machine Learning, and SaaS architectures.
              Currently working as an AI Automation Engineer at Atlantic Bridge
              Exchange Limited in the United Kingdom, while also contributing to
              Technology Center Lanka and serving clients through Veloxdy.com.
            </p>

            <p className="text-muted-foreground">
              I build custom AI applications, scalable SaaS platforms, and
              intelligent automation workflows across RAG systems, AI agents,
              voice automation, and full-stack web products. I also freelance
              on Upwork, helping clients turn business ideas into production
              ready web applications and AI-powered systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="/Herath_CV_AI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                View CV
              </a>

              <a
                href="/Herath_CV_AI.pdf"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> SaaS Development</h4>
                  <p className="text-muted-foreground">
                    Building scalable, multi-tenant software as a service
                    platforms with modern tech stacks.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Machine & Deep Learning
                  </h4>
                  <p className="text-muted-foreground">
                    Building prediction, classification, NLP, and computer
                    vision solutions with deployment-ready interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Generative & Agentic AI
                  </h4>
                  <p className="text-muted-foreground">
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
