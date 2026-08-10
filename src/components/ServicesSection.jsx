import { Brain, Code, Zap, BarChart3, Bot, Globe, BriefcaseBusiness } from "lucide-react";

const services = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "AI-Powered Applications",
    description: "Custom generative AI, NLP, RAG, and multimodal applications designed around practical business requirements.",
    features: ["Computer Vision (ViT, CNN)", "RAG & LLM Integration", "Multimodal AI", "Medical AI Diagnostics"]
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Full-Stack Web Development",
    description: "Modern full-stack applications with React interfaces, API backends, and scalable deployments on AWS and Vercel.",
    features: ["MERN Stack", "FastAPI + React", "Cloud Deployment", "Real-Time Applications"]
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI Agents & Automation",
    description: "Intelligent agents and automation workflows using LangChain, LangGraph, n8n, and external API integrations.",
    features: ["LangGraph Agents", "n8n Workflows", "Telegram Bots", "API Integrations"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Machine Learning Solutions",
    description: "Machine learning models for prediction, classification, and data analysis with deployment-ready web interfaces.",
    features: ["Predictive Models", "Classification Systems", "Data Analysis", "ML Web Apps"]
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Computer Vision Solutions",
    description: "Computer vision solutions using ViT, YOLOv8, convolutional neural networks, and deep learning for image and video analysis.",
    features: ["Object Detection (YOLOv8)", "Medical Image Analysis", "Video Processing", "Real-Time Classification"]
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "SaaS Solutions",
    description: "End-to-end SaaS development from discovery and design to deployment and scaling with multi-tenant architectures.",
    features: ["Multi-Tenant Systems", "Subscription Integration", "Scalable Cloud Infrastructure", "API-First Design"]
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What I Can <span className="text-primary">Build For You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focused engineering services for organizations that need practical
            automation, AI applications, and dependable web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border bg-card hover:bg-card/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold ml-4">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-primary">Key Capabilities:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Have a specific project in mind? Let us discuss how we can bring it
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="cosmic-button">
              Start Your Project
            </a>
            <a
              href="https://veloxdy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button-secondary"
            >
              Visit Veloxdy
            </a>
            <a
              href="https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button-secondary inline-flex items-center justify-center gap-2"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Hire Me on Upwork
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

