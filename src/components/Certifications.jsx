import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const certificationGroups = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    description:
      "Credentials covering AI agents, machine learning, model integration, and emerging agent protocols.",
    certifications: [
      {
        id: "hugging-face-agents",
        title: "Fundamentals of Agents",
        issuer: "Hugging Face",
        date: "2025",
        image: "/projects/c1.png",
      },
      {
        id: "anthropic-mcp",
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        date: "2025",
        image: "/projects/c4.png",
        verifyUrl: "https://verify.skilljar.com/c/v5gqbrcjunk2",
      },
      {
        id: "udemy-h2o-ai-agents",
        title: "H2O AI Agents",
        issuer: "Udemy",
        date: "2023",
        image: "/projects/c3.png",
        verifyUrl:
          "https://www.udemy.com/certificate/UC-8636b9b8-0665-4060-81e2-bfeed286146a/",
      },
      {
        id: "sliit-ai-ml-stage-1",
        title: "AI/ML Engineer Stage 1",
        issuer: "SLIIT",
        date: "2023",
        image: "/projects/c5.png",
        verifyUrl: "https://code.sliit.org/certificates/bbfgksmufy",
      },
      {
        id: "sliit-ai-ml-stage-2",
        title: "AI/ML Engineer Stage 2",
        issuer: "SLIIT",
        date: "2023",
        image: "/projects/c6.png",
        verifyUrl: "https://code.sliit.org/certificates/ycxfp9tcgp",
      },
      {
        id: "simplilearn-ai-introduction",
        title: "Introduction to Artificial Intelligence",
        issuer: "Simplilearn",
        date: "2023",
        image: "/projects/c7.png",
        verifyUrl: "https://lms.simplilearn.com/dashboard",
        actionLabel: "Credential portal",
      },
    ],
  },
  {
    id: "engineering-foundations",
    title: "Engineering Foundations",
    description:
      "Supporting credentials in containers, Python development, and web application fundamentals.",
    certifications: [
      {
        id: "kodekloud-docker",
        title: "Docker for Beginners",
        issuer: "KodeKloud",
        date: "2025",
        image: "/projects/c2.png",
        verifyUrl:
          "https://learn.kodekloud.com/user/certificate/a14ac195-3b98-4efb-9177-34b764c3d581",
      },
      {
        id: "uom-python-beginners",
        title: "Python for Beginners",
        issuer: "University of Moratuwa",
        date: "2022",
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
        image: "/projects/c9.jpg",
        verifyUrl:
          "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
        actionLabel: "Verification portal",
      },
    ],
  },
];

const categories = ["All", ...certificationGroups.map((group) => group.title)];

const certifications = certificationGroups.flatMap((group) =>
  group.certifications.map((certification) => ({
    ...certification,
    category: group.title,
  }))
);

const renderCertificationCard = (certification) => (
  <article
    key={certification.id}
    className="group bg-card border border-border rounded-lg overflow-hidden flex h-full flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
  >
    <div className="relative h-48 overflow-hidden flex justify-center items-center bg-secondary/20">
      <img
        src={certification.image}
        alt={`${certification.title} certificate`}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width="640"
        height="360"
      />
      <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
        {certification.category}
      </span>
      <span className="absolute right-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
        {certification.date}
      </span>
    </div>

    <div className="p-5 flex flex-1 flex-col text-left">
      <h3 className="text-xl font-semibold mb-2">{certification.title}</h3>
      <p className="text-muted-foreground text-sm mb-5 flex-1">
        {certification.issuer}
      </p>

      {certification.verifyUrl && (
        <div className="border-t border-border pt-4">
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:text-primary/75"
          >
            <ExternalLink size={16} aria-hidden="true" />
            {certification.actionLabel ?? "Verify credential"}
          </a>
        </div>
      )}
    </div>
  </article>
);

export const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertifications = certifications.filter(
    (certification) =>
      activeCategory === "All" || certification.category === activeCategory
  );

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Certifications <span className="text-primary">& Achievements</span>
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Professional learning across applied AI, automation, software
          engineering, and web development.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          aria-label="Certification categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "px-4 py-2 rounded-md transition-colors duration-200 font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map(renderCertificationCard)}
        </div>
      </div>
    </section>
  );
};
