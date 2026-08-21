import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#reviews" },
  { name: "Experience", href: "#experience" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const linkClassName = (href) =>
    cn(
      "relative py-2 text-sm font-medium transition-colors duration-200 hover:text-primary",
      activeSection === href.slice(1)
        ? "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary"
        : "text-foreground/75"
    );

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/90 py-3 shadow-xs backdrop-blur-md"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between gap-6">
        <a
          className="flex shrink-0 items-center text-lg font-bold text-foreground md:text-xl"
          href="#hero"
          aria-label="Udara Herath, back to top"
        >
          Udara <span className="ml-1 text-primary">Herath</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={linkClassName(item.href)}
              aria-current={
                activeSection === item.href.slice(1) ? "page" : undefined
              }
            >
              {item.name}
            </a>
          ))}
          <a
            href="/Herath_CV_AI.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="relative z-50 rounded-md border border-border bg-card p-2 text-foreground lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 px-6 backdrop-blur-md lg:hidden"
          >
            <div className="flex w-full max-w-sm flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-4 py-3 text-center text-lg font-medium transition-colors",
                    activeSection === item.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-secondary"
                  )}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/Herath_CV_AI.pdf"
                download
                onClick={closeMenu}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
