import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { DynamicBackground } from "../components/DynamicBackground";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Certifications } from "../components/Certifications";
import { EducationSection } from "../components/EducationSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { Chatbot } from "../components/Chatbot";
import { SkillGame } from "../components/SkillGame";
import { FuturePlansSection } from "../components/FuturePlansSection";

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
          <SkillsSection />
          <SkillGame />
          <ProjectsSection />
          <Certifications />
          <ExperienceSection />
          <EducationSection />
          <FuturePlansSection />
          {/* <ExperienceSection /> */}
          <ContactSection />
          <Chatbot />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
