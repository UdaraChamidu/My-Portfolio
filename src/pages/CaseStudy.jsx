import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DynamicBackground } from "../components/DynamicBackground";
import { StarBackground } from "../components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import { caseStudies } from "../data/caseStudies";

const renderSection = (title, content) => (
  <section className="border-t border-border py-10 md:py-12">
    <h2 className="mb-5 text-2xl font-semibold text-foreground">{title}</h2>
    {content}
  </section>
);

export const CaseStudy = () => {
  const { projectId } = useParams();
  const study = caseStudies[projectId];

  if (!study) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <DynamicBackground />
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <StarBackground />
      </div>

      <div className="relative z-10">
        <ThemeToggle />
        <header className="border-b border-border bg-background/90 backdrop-blur-md">
          <div className="container flex min-h-16 items-center justify-between gap-4">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to projects
            </a>
            <Link to="/" className="text-lg font-bold">
              Udara <span className="text-primary">Herath</span>
            </Link>
          </div>
        </header>

        <main>
          <article className="container max-w-5xl py-16 md:py-24">
            <p className="mb-4 text-sm font-semibold uppercase text-primary">
              {study.eyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {study.summary}
            </p>

            <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
              <img
                src={study.image}
                alt={`${study.title} interface`}
                className="aspect-video w-full object-cover"
                width="1280"
                height="720"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {study.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-12">
              {renderSection(
                "Business problem",
                <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  {study.problem}
                </p>
              )}

              {renderSection(
                "Engineering contribution",
                <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  {study.contribution}
                </p>
              )}

              {renderSection(
                "Core capabilities",
                <div className="grid gap-4 sm:grid-cols-2">
                  {study.capabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex items-start gap-3 rounded-md border border-border bg-card p-4"
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-primary"
                        size={19}
                        aria-hidden="true"
                      />
                      <span className="leading-6">{capability}</span>
                    </div>
                  ))}
                </div>
              )}

              {renderSection(
                "Solution architecture",
                <ol className="grid gap-3 md:grid-cols-2">
                  {study.architecture.map((layer, index) => (
                    <li
                      key={layer}
                      className="flex items-center gap-3 rounded-md border border-border bg-card p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="font-medium">{layer}</span>
                    </li>
                  ))}
                </ol>
              )}

              {renderSection(
                "Engineering considerations",
                <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  {study.considerations}
                </p>
              )}

              {renderSection(
                "Project outcome",
                <div>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  {study.outcome}
                </p>

                {(study.demoUrl || study.githubUrl) && (
                  <div className="mt-7 flex flex-wrap gap-4">
                    {study.demoUrl && (
                      <a
                        href={study.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <ExternalLink size={18} aria-hidden="true" />
                        View project
                      </a>
                    )}
                    {study.githubUrl && (
                      <a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 font-medium transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <Github size={18} aria-hidden="true" />
                        View source
                      </a>
                    )}
                  </div>
                )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
              <a
                href="/#projects"
                className="inline-flex items-center gap-2 font-medium text-foreground/75 hover:text-primary"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Explore other projects
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Discuss a project
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </article>
        </main>

        <footer className="border-t border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Udara Herath | Veloxdy.com
        </footer>
      </div>
    </div>
  );
};
