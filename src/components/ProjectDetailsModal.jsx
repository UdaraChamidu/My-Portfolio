import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";

// This local layout wrapper receives only static content from the modal.
// eslint-disable-next-line react/prop-types
const DetailSection = ({ title, children }) => (
  <section className="border-t border-border py-8 md:py-10">
    <h3 className="mb-4 text-xl font-semibold md:text-2xl">{title}</h3>
    {children}
  </section>
);

export const ProjectDetailsModal = ({ project, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-details-title`}
        className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-lg border border-border bg-background text-left shadow-2xl"
      >
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary">
              {project.type} | {project.status}
            </p>
            <p className="truncate text-sm font-medium text-muted-foreground">
              {project.period}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="icon-button shrink-0"
            aria-label="Close project details"
            title="Close project details"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="px-5 pb-8 pt-8 sm:px-8 md:px-10 md:pb-12 md:pt-10">
          <div className="max-w-4xl">
            <p className="section-kicker">Featured Case Study</p>
            <h2
              id={`${project.id}-details-title`}
              className="text-3xl font-bold leading-tight md:text-5xl"
            >
              {project.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {project.summary}
            </p>
            {project.disclaimer && (
              <p className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-foreground">
                {project.disclaimer}
              </p>
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Role", project.role],
              ["Engagement", project.engagement],
              ["Delivery", `${project.status} | ${project.period}`],
            ].map(([label, value]) => (
              <div key={label} className="surface-card p-4">
                <p className="text-xs font-semibold text-primary">{label}</p>
                <p className="mt-1 text-sm font-medium leading-6">{value}</p>
              </div>
            ))}
          </div>

          <DetailSection title="Business problem">
            <p className="max-w-4xl leading-7 text-muted-foreground">
              {project.problem}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.targetUsers.map((user) => (
                <span key={user} className="meta-tag">
                  {user}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="My contribution">
            <p className="max-w-4xl leading-7 text-muted-foreground">
              {project.contribution}
            </p>
          </DetailSection>

          <DetailSection title="How the platform works">
            <ol className="grid gap-3 md:grid-cols-2">
              {project.workflow.map((step, index) => (
                <li key={step} className="surface-card flex gap-3 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection title="Product gallery">
            <div className="grid gap-5 lg:grid-cols-2">
              {project.images.map((image, index) => (
                <figure
                  key={image.src}
                  className={`surface-card overflow-hidden ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-video w-full object-cover object-top"
                    loading="lazy"
                    width="1280"
                    height="720"
                  />
                  <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </DetailSection>

          {project.video && (
            <DetailSection title="Product demonstration">
              <div className="surface-card overflow-hidden bg-black">
                <video
                  className="aspect-video w-full"
                  controls
                  preload="none"
                  poster={project.video.poster}
                >
                  <source src={project.video.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The demo is loaded only when playback begins, so it does not
                slow the initial portfolio page.
              </p>
            </DetailSection>
          )}

          <div className="grid gap-8 border-t border-border py-8 lg:grid-cols-2 md:py-10">
            <section>
              <h3 className="mb-4 text-xl font-semibold md:text-2xl">
                Key capabilities
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-semibold md:text-2xl">
                Technology stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="meta-tag px-3 py-2">
                    {technology}
                  </span>
                ))}
              </div>

              <h3 className="mb-4 mt-8 text-xl font-semibold md:text-2xl">
                Solution architecture
              </h3>
              <ol className="space-y-2">
                {project.architecture.map((layer, index) => (
                  <li
                    key={layer}
                    className="flex items-center gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {layer}
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <DetailSection title="Engineering challenges">
            <div className="grid gap-3 md:grid-cols-2">
              {project.challenges.map((challenge) => (
                <div key={challenge} className="surface-card p-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Outcome">
            <p className="max-w-4xl leading-7 text-muted-foreground">
              {project.outcome}
            </p>
          </DetailSection>

          <div className="surface-card flex flex-col gap-5 border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div className="flex gap-3">
              <ShieldCheck
                className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold">Privacy-conscious presentation</h3>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {project.privacy}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <div className="flex flex-wrap gap-3 sm:justify-end">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                  >
                    View live platform
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    View repository
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                )}
              </div>
              {project.accessNote && (
                <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground sm:ml-auto">
                  {project.accessNote}
                </p>
              )}
              {project.availabilityNote && (
                <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:ml-auto">
                  {project.availabilityNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
};
