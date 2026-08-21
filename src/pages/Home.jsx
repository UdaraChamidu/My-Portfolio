import { lazy, Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { DynamicBackground } from "../components/DynamicBackground";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { CredentialsSection } from "../components/CredentialsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { Chatbot } from "../components/Chatbot";
import { ServicesSection } from "../components/ServicesSection";
import { ReviewsSection } from "../components/ReviewsSection";

const SkillsSection = lazy(() =>
  import("../components/SkillsSection").then((module) => ({
    default: module.SkillsSection,
  }))
);

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <DynamicBackground />

      <div className="fixed inset-0 z-[5] pointer-events-none">
        <StarBackground />
      </div>

      <div className="relative z-10">
        <ThemeToggle />
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <ReviewsSection />
          <ExperienceSection />
          <Suspense
            fallback={
              <div className="min-h-96 bg-secondary/30" aria-hidden="true" />
            }
          >
            <SkillsSection />
          </Suspense>
          <CredentialsSection />
          <ContactSection />
          <Chatbot />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
