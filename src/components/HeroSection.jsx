import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  Mail,
  Rocket,
} from "lucide-react";

const proofItems = [
  {
    label: "Current UK role",
    value: "Atlantic Bridge Exchange Limited",
    icon: Building2,
    url: "http://38.52.133.152/home/",
  },
  {
    label: "International freelance work",
    value: "Upwork AI & Full-Stack Developer",
    icon: BriefcaseBusiness,
    url: "https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share",
  },
  {
    label: "Founder",
    value: "Veloxdy AI & Web Solutions",
    icon: Rocket,
    url: "https://veloxdy.com",
  },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-4 pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div className="section-inner relative z-10 text-center">
        <div className="mx-auto -mt-10 mb-7 h-52 w-52 overflow-hidden rounded-full border-4 border-primary bg-card p-1 shadow-[0_0_24px_hsl(var(--primary)/0.25)] sm:h-60 sm:w-60">
          <img
            src="/udara.jpg"
            alt="Udara Herath"
            className="h-full w-full rounded-full object-cover"
            width="240"
            height="240"
            fetchPriority="high"
          />
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Hi, I am <span className="text-primary">Udara Herath</span>
        </h1>
        <p className="mx-auto mb-5 max-w-3xl text-xl font-semibold leading-snug text-foreground/90 sm:text-2xl md:text-3xl">
          AI Automation Engineer & Full-Stack Developer
        </p>

        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          I design AI agents, automation workflows, and full-stack web
          applications that help businesses reduce repetitive work, connect
          their tools, and turn ideas into reliable digital products.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="button-primary"
          >
            View Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="button-secondary"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact Me
          </a>
          <a
            href="#services"
            className="button-secondary"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            View Services
          </a>
        </div>

        <div className="surface-card mt-12 grid overflow-hidden text-left md:grid-cols-3">
          {proofItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 items-center gap-3 border-b border-border px-4 py-4 transition-colors hover:bg-secondary/60 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold leading-5 text-foreground">
                    {item.value}
                  </span>
                </span>
                <ExternalLink
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
