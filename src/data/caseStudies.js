export const caseStudiesPublic = false;

export const caseStudies = {
  "insurance-ai-consultant": {
    title: "Insurance AI Consultant Platform",
    eyebrow: "Client project · AI application",
    image: "/projects/insurance.png",
    summary:
      "An AI-enabled consultation and client-intake platform that brings meetings, scheduling, compliance workflows, and grounded insurance knowledge into one experience.",
    problem:
      "Insurance consultations can involve disconnected scheduling, meeting, intake, compliance, and knowledge-reference processes. The project brings those steps together so professionals can manage consultations with less operational fragmentation.",
    contribution:
      "Built the integrated application experience across the React interface, Supabase-backed services, real-time video communication, and Pinecone-supported retrieval workflow.",
    technologies: ["React", "Supabase", "WebRTC", "Pinecone", "RAG"],
    capabilities: [
      "Client intake and consultation workflows",
      "Video meetings and appointment scheduling",
      "Grounded answers from an insurance knowledge base",
      "Compliance-aware workflow support",
    ],
    architecture: [
      "React client portal",
      "Supabase authentication and data services",
      "WebRTC consultation layer",
      "RAG pipeline with Pinecone retrieval",
    ],
    considerations:
      "The platform is designed to support insurance professionals rather than replace their judgment. Sensitive consultation data and AI-generated guidance require controlled access, traceability, and professional review.",
    outcome:
      "The resulting platform demonstrates a unified consultation workflow in which communication, intake, scheduling, and AI-assisted knowledge retrieval can operate together.",
    demoUrl: "https://insurance-agent-ruby.vercel.app/",
  },
  "ai-voice-agent-platform": {
    title: "AI Voice Agent Platform",
    eyebrow: "Professional project · AI automation",
    image: "/projects/project18.png",
    summary:
      "A production-ready, multi-tenant platform for automated outbound calling with natural real-time conversations, persistent context, follow-up automation, and campaign analytics.",
    problem:
      "Outbound campaigns require repeated calling, consistent conversations, follow-up work, and clear performance tracking. Handling those activities manually limits scale and makes campaign operations difficult to coordinate.",
    contribution:
      "Developed the React campaign dashboard and connected telephony, real-time speech services, conversational AI, vector memory, and n8n agentic workflows into one automated calling system.",
    technologies: [
      "React",
      "n8n",
      "Twilio",
      "Vapi",
      "Deepgram",
      "ElevenLabs",
      "Pinecone",
      "Supabase",
    ],
    capabilities: [
      "Automated outbound calling campaigns",
      "Real-time speech recognition and voice generation",
      "Context-aware conversations using long-term vector memory",
      "Automated SMS and email follow-ups",
      "Multi-tenant onboarding, contacts, and analytics",
    ],
    architecture: [
      "React multi-tenant dashboard",
      "Supabase application data",
      "n8n campaign orchestration",
      "Twilio and Vapi telephony",
      "Deepgram STT and ElevenLabs TTS",
      "LLM conversation layer with Pinecone memory",
    ],
    considerations:
      "Campaign isolation, contact data protection, reliable workflow state, and transparent AI behavior are central to operating automated voice outreach responsibly.",
    outcome:
      "The platform provides an end-to-end foundation for configuring campaigns, conducting AI-assisted calls, retaining conversation context, triggering follow-ups, and monitoring activity from one dashboard.",
  },
  "biabot-client-intake": {
    title: "BiaBot: AI Client Intake Platform",
    eyebrow: "Professional project · Conversational AI",
    image: "/projects/project19.png",
    summary:
      "A full-stack conversational intake platform that replaces rigid onboarding forms with guided text and voice conversations and structured internal handoffs.",
    problem:
      "Traditional intake forms can be impersonal, incomplete, and difficult to translate into actionable internal work. Teams still need to interpret submissions, prepare summaries, and transfer information into their operating tools.",
    contribution:
      "Built the React and FastAPI application, developed the LLM-based extraction and summarization pipeline, added text and voice interaction, and integrated Monday.com with audit logging for traceable workflow handoffs.",
    technologies: [
      "React",
      "FastAPI",
      "Supabase",
      "OpenAI",
      "Voice I/O",
      "Monday.com API",
      "Google Cloud Run",
    ],
    capabilities: [
      "Conversational text and voice intake",
      "Structured information extraction",
      "Review-ready mission summaries",
      "Automated Monday.com workflow handoffs",
      "Submission audit logging",
    ],
    architecture: [
      "React conversational interface",
      "FastAPI application API",
      "OpenAI extraction and summarization pipeline",
      "Supabase data and audit records",
      "Monday.com operational handoff",
      "Google Cloud Run deployment",
    ],
    considerations:
      "Extracted information is presented for review before it becomes operational input. Audit records provide traceability across intake and handoff events.",
    outcome:
      "BiaBot turns natural client conversations into structured, reviewable information and reduces the manual work required to move an intake submission into an internal workflow.",
  },
  "hr-leave-management": {
    title: "HR Leave Management System",
    eyebrow: "Internship work · Full-stack application",
    image: "/projects/hr-leave.png",
    summary:
      "A full-stack HR platform for managing leave and work-from-home requests, company announcements, holidays, and real-time employee updates.",
    problem:
      "Leave requests, remote-work requests, announcements, and holiday information can become scattered across messages and documents, making status tracking harder for employees and HR teams.",
    contribution:
      "Contributed to the full-stack implementation of the employee and HR workflows using React, NestJS, Prisma, and PostgreSQL during an internship engagement.",
    technologies: ["React", "NestJS", "Prisma", "PostgreSQL"],
    capabilities: [
      "Leave and work-from-home requests",
      "Request status management",
      "Company announcements and holidays",
      "Real-time employee updates",
    ],
    architecture: [
      "React employee and administration interfaces",
      "NestJS application API",
      "Prisma data-access layer",
      "PostgreSQL relational database",
    ],
    considerations:
      "HR records require role-aware access and consistent status transitions so employees and administrators see reliable, appropriate information.",
    outcome:
      "The application centralizes common HR requests and communication into a single workflow-oriented system.",
  },
  "lumina-ai": {
    title: "Lumina AI",
    eyebrow: "Internship work · AI application",
    image: "/projects/lumina.png",
    summary:
      "A Gemini-powered conversational AI application with a responsive React interface, FastAPI backend, and Supabase authentication and data services.",
    problem:
      "A useful conversational AI product needs more than a model response: it requires an accessible interface, secure user access, reliable backend orchestration, and persistent application data.",
    contribution:
      "Contributed to the full-stack AI application during an internship, integrating the React experience, FastAPI service layer, Gemini capabilities, and Supabase-backed authentication and data services.",
    technologies: ["React", "FastAPI", "Gemini", "Supabase"],
    capabilities: [
      "Conversational AI interactions",
      "Authenticated user experience",
      "Backend model orchestration",
      "Persistent application data",
    ],
    architecture: [
      "React conversational interface",
      "FastAPI backend service",
      "Gemini model integration",
      "Supabase authentication and storage",
    ],
    considerations:
      "The separation between interface, backend orchestration, model access, and user data supports clearer security boundaries and maintainable deployment.",
    outcome:
      "Lumina AI demonstrates a complete conversational product architecture rather than a standalone model prototype.",
    demoUrl: "https://phpstack-1409163-6105388.cloudwaysapps.com",
    githubUrl: "https://github.com/UdaraChamidu/Lumina-AI",
  },
};

export const featuredCaseStudyIds = Object.keys(caseStudies);
