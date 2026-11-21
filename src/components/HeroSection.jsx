import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  // Building2, // Restore with the temporarily hidden UK proof item.
  ExternalLink,
  Rocket,
  Workflow,
} from "lucide-react";

const proofItems = [
  /* Temporarily hidden. Remove this comment wrapper to restore the UK role.
  {
    label: "Current UK role",
    value: "Atlantic Bridge Exchange Limited",
    icon: Building2,
    url: "http://38.52.133.152/home/",
  },
  */
  {
    label: "Top Rated on Upwork",
    value: "AI Engineer | 100% Job Success Score",
    icon: Award,
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
      className="hero-client relative flex items-center px-4 pb-10 pt-28 md:pb-12 md:pt-28"
    >
      <div className="hero-entrance section-inner relative z-10">
        <div className="grid items-center gap-7 lg:grid-cols-[3fr_2fr] lg:gap-6">
          <div className="min-w-0 text-center lg:text-left">
          <div className="mb-5">
            <p className="text-2xl font-semibold text-primary sm:text-3xl">Hi, I am Udara Herath</p>
            <p className="mt-2 text-lg leading-snug text-foreground/90 sm:text-xl">AI Engineer & Automation Specialist</p>
          </div>

        <h1 className="hero-client-title font-bold">
          Turn your ideas into{" "}
          <span className="block text-primary">intelligent solutions.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8 lg:mx-0">
          I help businesses turn ideas into AI agents, voice systems, and
          custom applications that work. From automating repetitive tasks to
          connecting your tools, I build around what your business needs.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
          <a
            href="#contact"
            className="button-primary"
          >
            Discuss Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#projects"
            className="button-secondary"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            Explore My Work
          </a>
          <a
            href="#services"
            className="button-secondary"
          >
            <Workflow className="h-4 w-4" aria-hidden="true" />
            View Services
          </a>
        </div>
          </div>

          <div className="order-first flex justify-center lg:order-last">
            <div className="hero-portrait aspect-square w-44 overflow-hidden rounded-full border-2 border-primary bg-card p-1 shadow-[0_0_24px_hsl(var(--primary)/0.25)] sm:w-56 lg:w-full lg:max-w-80 xl:max-w-[360px]">
              <img
                src="/profile.jpg"
                alt="Udara Herath"
                className="h-full w-full rounded-full object-cover object-[center_35%]"
                width="360"
                height="360"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Restore md:grid-cols-3 when the hidden UK proof item is enabled. */}
        <div className="mt-8 grid border-y border-border/70 text-left sm:grid-cols-2 lg:mt-10">
          {proofItems.map((item) => {
            const Icon = item.icon;
            const Wrapper = item.url ? "a" : "div";
            const linkProps = item.url
              ? {
                  href: item.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Wrapper
                key={item.label}
                {...linkProps}
                className="group flex items-center gap-3 border-b border-border/70 px-3 py-4 transition-colors hover:bg-primary/5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-5"
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
                {item.url && (
                  <ExternalLink
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
