import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const SESSION_ID = crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
  const quickReplies = ["Hello!", "Tell me about AI", "Portfolio info"];

  // Show tip periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 4000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (messageText) => {
    const userMessage = messageText || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    try {
      setIsTyping(true);
      const response = await fetch(
        "https://my-portfolio-chatbot-portfolio-chatbot.up.railway.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, session_id: SESSION_ID }),
        }
      );

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: data.response }]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {showTip && !isOpen && (
          <div className="mb-2 px-3 py-1 bg-primary text-white rounded-lg shadow-lg text-sm animate-fade-in-out animate-bounce-tip">
            Chat with my assistant
          </div>
        )}

        <button
          className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors animate-bounce-icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-xl shadow-xl flex flex-col overflow-hidden z-50 animate-slide-up">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <span>Chat with AI</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 p-2 rounded-lg ${
                  msg.from === "bot"
                    ? "bg-secondary/30 text-left"
                    : "bg-primary/70 text-white text-right ml-auto"
                }`}
              >
                {msg.from === "bot" && (
                  <img
                    src="/avatar.jpg" // <-- Replace with your AI avatar image path
                    alt="AI Avatar"
                    className="w-8 h-8 rounded-full object-cover animate-avatar-bounce"
                  />
                )}
                <span>{msg.text}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
                <img
                  src="avatar.jpg" // <-- Same avatar for typing
                  alt="AI Avatar"
                  className="w-8 h-8 rounded-full object-cover animate-avatar-bounce"
                />
                <span className="text-sm text-muted-foreground">
                  AI is typing...
                </span>
              </div>
            )}
          </div>

          {/* Quick Reply Buttons */}
          <div className="flex flex-wrap gap-2 p-3 border-t border-muted-foreground">
            {quickReplies.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1 bg-primary/80 text-white rounded-full hover:bg-primary/90 transition-colors text-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-3 border-t border-muted-foreground">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg border border-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-out {
          animation: fade-in-out 4s ease-in-out forwards;
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        @keyframes avatar-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-avatar-bounce {
          animation: avatar-bounce 0.6s infinite ease-in-out;
        }
        .animate-pulse {
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes bounce-icon {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-icon {
          animation: bounce-icon 1s infinite ease-in-out;
        }
        @keyframes bounce-tip {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-bounce-tip {
          animation: bounce-tip 1.5s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};
