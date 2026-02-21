import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 md:pt-0"
    >
      <div className="container max-w-4xl mx-auto text-center z-10 relative">
        {/* Profile Image with Floating + Matching Purple Glow */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-full bg-gradient-to-r from-primary/80 to-primary animate-[float_6s_ease-in-out_infinite]">
            <img
              src="/udara.jpg"
              alt="Udara Herath"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full object-cover shadow-lg border-4 border-primary/50
                         transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(115,88,242,0.6)]"
            />
          </div>
        </div>

        {/* Name with Animated Purple Gradient */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight drop-shadow-md mb-6">
          <span className="opacity-0 animate-fade-in"> Hi,</span>
          <span className="text-primary ml-2 opacity-0 animate-fade-in-delay-1">
            I am
          </span>
          <span className="opacity-0 animate-fade-in-delay-2">
            {" "}
            Udara
          </span>
          <span className="text-primary opacity-0 animate-fade-in-delay-3">
            {" "}
            Herath
          </span>
        </h1>

        {/* Subtitle / Intro */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4">
          I'm a final year Computer Engineering student at Faculty of
          Engineering, University of Jaffna. Currently interning as a Software
          Engineer while freelancing in AI/ML solutions and SaaS development.
        </p>

        {/* CTA Buttons */}
        <div className="pt-6 opacity-0 animate-fade-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="cosmic-button">
            What I Can Build
          </a>
          <a href="#projects" className="cosmic-button-secondary">
            View My Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>

      {/* Floating Animation & Gradient Text */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes gradient-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-gradient {
          background: linear-gradient(90deg, #7358f2, #9579f9, #7358f2);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};