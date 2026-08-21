import { useState } from "react";
import { BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const education = [
  {
    id: "computer-engineering",
    degree: "B.Sc. (Hons) in Computer Engineering",
    institute: "Faculty of Engineering, University of Jaffna",
    duration: "2022 - Present",
    description:
      "Coursework and project work in artificial intelligence, machine learning, deep learning, and software engineering.",
  },
  {
    id: "secondary-education",
    degree: "Secondary Education",
    institute: "Dhammissara National College, Nattandiya",
    duration: "2012 - 2020",
    description: "Focused on mathematics and science.",
  },
];

const certifications = [
  {
    id: "hugging-face-agents",
    title: "Fundamentals of Agents",
    issuer: "Hugging Face",
    date: "2025",
    category: "AI & Automation",
    image: "/projects/c1.png",
  },
  {
    id: "anthropic-mcp",
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "2025",
    category: "AI & Automation",
    image: "/projects/c4.png",
    verifyUrl: "https://verify.skilljar.com/c/v5gqbrcjunk2",
  },
  {
    id: "udemy-h2o-ai-agents",
    title: "H2O AI Agents",
    issuer: "Udemy",
    date: "2023",
    category: "AI & Automation",
    image: "/projects/c3.png",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-8636b9b8-0665-4060-81e2-bfeed286146a/",
  },
  {
    id: "sliit-ai-ml-stage-1",
    title: "AI/ML Engineer Stage 1",
    issuer: "SLIIT",
    date: "2023",
    category: "AI & Automation",
    image: "/projects/c5.png",
    verifyUrl: "https://code.sliit.org/certificates/bbfgksmufy",
  },
  {
    id: "sliit-ai-ml-stage-2",
    title: "AI/ML Engineer Stage 2",
    issuer: "SLIIT",
    date: "2023",
    category: "AI & Automation",
    image: "/projects/c6.png",
    verifyUrl: "https://code.sliit.org/certificates/ycxfp9tcgp",
  },
  {
    id: "simplilearn-ai-introduction",
    title: "Introduction to Artificial Intelligence",
    issuer: "Simplilearn",
    date: "2023",
    category: "AI & Automation",
    image: "/projects/c7.png",
    verifyUrl: "https://lms.simplilearn.com/dashboard",
    actionLabel: "Credential portal",
  },
  {
    id: "kodekloud-docker",
    title: "Docker for Beginners",
    issuer: "KodeKloud",
    date: "2025",
    category: "Engineering Foundations",
    image: "/projects/c2.png",
    verifyUrl:
      "https://learn.kodekloud.com/user/certificate/a14ac195-3b98-4efb-9177-34b764c3d581",
  },
  {
    id: "uom-python-beginners",
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    date: "2022",
    category: "Engineering Foundations",
    image: "/projects/c8.png",
    verifyUrl:
      "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
    actionLabel: "Verification portal",
  },
  {
    id: "uom-web-design-beginners",
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    date: "2022",
    category: "Engineering Foundations",
    image: "/projects/c9.jpg",
    verifyUrl:
      "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
    actionLabel: "Verification portal",
  },
];

const certificationCategories = [
  "All",
  "AI & Automation",
  "Engineering Foundations",
];

export const CredentialsSection = () => {
  const [activeView, setActiveView] = useState("education");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertifications = certifications.filter(
    (certification) =>
      activeCategory === "All" || certification.category === activeCategory
  );

  return (
    <section id="credentials" className="relative px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Education & <span className="text-primary">Credentials</span>
          </h2>
          <p className="leading-7 text-muted-foreground">
            Academic foundations and continued professional learning across AI,
            automation, and software engineering.
          </p>
        </div>

        <div
          className="mb-10 flex justify-center"
          role="tablist"
          aria-label="Credential views"
        >
          <div className="inline-flex rounded-md border border-border bg-card p-1">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "education"}
              onClick={() => setActiveView("education")}
              className={cn(
                "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors",
                activeView === "education"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Education
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "certifications"}
              onClick={() => setActiveView("certifications")}
              className={cn(
                "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors",
                activeView === "certifications"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Certifications
            </button>
          </div>
        </div>

        {activeView === "education" ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-border bg-card p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {item.duration}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold leading-7">
                      {item.degree}
                    </h3>
                  </div>
                </div>
                <p className="font-medium text-foreground/80">
                  {item.institute}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div>
            <div
              className="mb-10 flex flex-wrap justify-center gap-3"
              aria-label="Certification categories"
            >
              {certificationCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertifications.map((certification) => (
                <article
                  key={certification.id}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative flex h-44 items-center justify-center border-b border-border bg-secondary/20">
                    <img
                      src={certification.image}
                      alt={`${certification.title} certificate`}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      width="640"
                      height="360"
                    />
                    <span className="absolute right-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                      {certification.date}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs font-semibold text-primary">
                      {certification.category}
                    </p>
                    <h3 className="text-lg font-semibold leading-6">
                      {certification.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {certification.issuer}
                    </p>

                    {certification.verifyUrl && (
                      <a
                        href={certification.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-medium text-primary hover:text-primary/75"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {certification.actionLabel ?? "Verify credential"}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
