import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

// Defaults keep this shared header usable on both writing routes.
// eslint-disable-next-line react/prop-types
export const WritingHeader = ({ backTo = "/", backLabel = "Back to portfolio" }) => (
  <header className="border-b border-border bg-background/90 backdrop-blur-md">
    <div className="container flex min-h-16 items-center justify-between gap-4">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        {backLabel}
      </Link>
      <Link to="/" className="text-lg font-bold">
        Udara <span className="text-primary">Herath</span>
      </Link>
      <ThemeToggle embedded />
    </div>
  </header>
);
