import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/90 px-4 py-8 backdrop-blur-md">
      <div className="section-inner flex flex-wrap items-center justify-between gap-4">
        <p className="text-left text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Udara Herath | Veloxdy.com. All
          rights reserved.
        </p>
        <a
          href="#hero"
          className="icon-button"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};
