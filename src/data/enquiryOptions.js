export const enquiryServices = [
  { id: "ai-automation", label: "AI Workflow Automation" },
  { id: "voice-conversational-ai", label: "AI Voice Agents & Conversational AI" },
  { id: "agentic-ai-llm", label: "Agentic AI & LLM Solutions" },
  { id: "custom-ai-integrations", label: "Custom AI Solutions & Integrations" },
];

export const enquiryTimelines = ["Exploring options", "Within a month", "1-3 months", "Flexible"];

export function chooseEnquiryService(id) {
  if (enquiryServices.some((service) => service.id === id)) {
    window.dispatchEvent(new CustomEvent("portfolio:enquiry-service", { detail: id }));
  }
}
