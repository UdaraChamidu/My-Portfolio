import { ArrowUp, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/92 px-4 py-8 backdrop-blur-md">
      <div className="section-inner">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <a href="#hero" className="text-lg font-bold text-foreground">
            Udara <span className="text-primary">Herath</span>
          </a>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground"
            aria-label="Footer navigation"
          >
            <a className="hover:text-primary" href="#about">About</a>
            <a className="hover:text-primary" href="#projects">Projects</a>
            <a className="hover:text-primary" href="#services">Services</a>
            <a className="hover:text-primary" href="#contact">Contact</a>
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <p className="text-left text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Udara Herath. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://veloxdy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Veloxdy
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        <a
          href="#hero"
          className="icon-button"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </a>
        </div>
        </div>
      </div>
    </footer>
  );
};
