import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  // Building2, // Restore with the temporarily hidden UK proof item.
  ExternalLink,
  Rocket,
  Workflow,
} from "lucide-react";
import { RotatingHeroHeadline } from "./RotatingHeroHeadline";
import { HeroTechnologyFloat } from "./HeroTechnologyFloat";

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
      <div className="section-inner relative z-10">
        <div className="grid items-center gap-7 lg:grid-cols-[3fr_2fr] lg:gap-6">
          <div className="relative z-10 min-w-0 text-center lg:text-left">
          <div className="mb-5">
            <p className="hero-reveal text-2xl font-semibold text-foreground sm:text-3xl">
              Hi, I am <span className="text-primary">Udara Herath</span>
            </p>
            <p className="hero-reveal mt-2 text-lg leading-snug text-foreground/90 sm:text-xl" style={{ "--hero-delay": "80ms" }}>AI Engineer & Automation Specialist</p>
          </div>

        <RotatingHeroHeadline />

        <p className="hero-reveal mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8 lg:mx-0" style={{ "--hero-delay": "240ms" }}>
          I help businesses turn ideas into AI agents, voice systems, and
          custom applications that work. From automating repetitive tasks to
          connecting your tools, I build around what your business needs.
        </p>
        <div className="hero-reveal mt-7 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ "--hero-delay": "320ms" }}>
          <a
            href="#contact"
            className="hero-cta-glow button-primary"
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

          <div className="hero-reveal order-first flex justify-center lg:order-last" style={{ "--hero-delay": "160ms" }}>
            <div className="hero-portrait-stage relative isolate aspect-square w-44 sm:w-56 lg:w-full lg:max-w-80 xl:max-w-[360px]">
              <HeroTechnologyFloat />
            <div className="hero-portrait relative aspect-square w-full overflow-hidden rounded-full border-2 border-primary bg-card p-1 shadow-[0_0_24px_hsl(var(--primary)/0.25)]">
              <img
                src="/profile.jpg"
                alt="Udara Herath"
                className="h-full w-full rounded-full object-cover object-[center_35%]"
                width="360"
                height="360"
                loading="eager"
              />
            </div>
            </div>
          </div>
        </div>

        {/* Restore md:grid-cols-3 when the hidden UK proof item is enabled. */}
        <div className="hero-reveal mt-8 grid border-y border-border/70 text-left sm:grid-cols-2 lg:mt-10" style={{ "--hero-delay": "400ms" }}>
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
