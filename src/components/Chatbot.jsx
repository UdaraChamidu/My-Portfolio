import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";

const ChatMessage = lazy(() => import("./ChatMessage").then((module) => ({ default: module.ChatMessage })));

const quickReplies = [
  { label: "Automate my business", message: "How could Udara help automate my business?" },
  { label: "Explore AI projects", message: "Which of Udara's AI and automation projects should I explore?" },
  { label: "Start a project", message: "How can I discuss a new project with Udara?" },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I am Udara's AI assistant. Tell me what you would like to build, or ask about his work." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const chatHistoryRef = useRef([]);
  const messageListRef = useRef(null);
  const launcherRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const pendingRef = useRef(false);
  const requestRef = useRef(null);
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    if (!isOpen || !window.visualViewport) return undefined;
    const update = () => {
      const visual = window.visualViewport;
      const inset = Math.max(0, window.innerHeight - visual.height - visual.offsetTop);
      setViewport({ bottom: inset + (inset > 120 ? 16 : 96), height: Math.min(580, visual.height - (inset > 120 ? 32 : 120)) });
    };
    update();
    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);
    return () => {
      window.visualViewport.removeEventListener("resize", update);
      window.visualViewport.removeEventListener("scroll", update);
    };
  }, [isOpen]);

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [isOpen, messages, isTyping, error]);

  useEffect(() => {
    if (!isOpen) return undefined;
    inputRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        launcherRef.current?.focus({ preventScroll: true });
      }
    };
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target) && !launcherRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const handleSend = async (messageText) => {
    const userMessage = (messageText ?? input).trim();
    if (!userMessage || pendingRef.current) return;
    pendingRef.current = true;
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 35000);
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setError("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ message: userMessage, history: chatHistoryRef.current }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result) {
        throw new Error(result?.error || "The chat service is unavailable. Please try again or contact Udara below.");
      }
      const botText = typeof result.text === "string" ? result.text.trim() : "";
      if (!botText) throw new Error("The assistant returned an empty reply. Please try again.");

      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: "user", text: userMessage },
        { role: "model", text: botText },
      ].slice(-8);
      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch (failure) {
      setError(failure.name === "AbortError"
        ? "The reply took too long. Please try again or contact Udara directly."
        : failure.message || "Could not connect. Please try again.");
      setInput(userMessage);
    } finally {
      clearTimeout(timeout);
      pendingRef.current = false;
      requestRef.current = null;
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:h-18 md:w-18"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close assistant" : "Chat with Udara's assistant"}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <section
          ref={panelRef}
          style={viewport ? { bottom: viewport.bottom, height: Math.max(180, viewport.height) } : undefined}
          id="portfolio-chat"
          role="dialog"
          aria-labelledby="chat-title"
          className="chat-panel fixed bottom-24 right-3 z-50 flex h-[min(580px,calc(100dvh-120px))] w-[calc(100%-1.5rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-primary/30 shadow-2xl sm:right-6"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-primary/10 px-4 py-3">
            <div className="text-left">
              <h2 id="chat-title" className="font-semibold">Udara&apos;s AI Assistant</h2>
              <p className="text-xs text-muted-foreground">AI, automation & project enquiries</p>
            </div>
            <button type="button" className="icon-button shrink-0" aria-label="Close chat" onClick={() => {
              setIsOpen(false);
              launcherRef.current?.focus({ preventScroll: true });
            }}>
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div ref={messageListRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-left">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message rounded-lg p-3 text-sm leading-6 ${msg.from === "bot"
                ? "mr-4 bg-secondary/60 text-foreground"
                : "ml-6 bg-primary text-primary-foreground"}`}>
                <p className="mb-1 text-xs font-semibold">{msg.from === "bot" ? "Assistant" : "You"}</p>
                <Suspense fallback={<p>{msg.text}</p>}><ChatMessage text={msg.text} /></Suspense>
              </div>
            ))}
            {isTyping && <p role="status" className="text-sm text-muted-foreground">Thinking...</p>}
            {error && (
              <div role="alert" className="rounded-md border border-primary/30 bg-background/70 p-3 text-sm leading-6">
                <p>{error}</p>
                <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 inline-flex items-center gap-1 font-semibold text-primary">Contact Udara <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex shrink-0 flex-wrap gap-2 border-t border-border p-3">
              {quickReplies.map((reply) => (
                <button key={reply.label} type="button" onClick={() => handleSend(reply.message)} disabled={isTyping} className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50">{reply.label}</button>
              ))}
            </div>
          )}

          <form className="flex shrink-0 gap-2 border-t border-border p-3" onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
            <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1000} placeholder="What would you like to build?" aria-label="Your message" className="min-w-0 flex-1 rounded-md border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" disabled={isTyping || !input.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><Send size={18} aria-hidden="true" /></button>
          </form>
        </section>
      )}
    </>
  );
};
