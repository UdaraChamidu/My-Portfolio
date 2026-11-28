import { Bot, Hand } from "lucide-react";

export const ChatAssistantAvatar = () => (
  <span className="chat-assistant-avatar" aria-hidden="true">
    <span className="chat-assistant-head"><Bot strokeWidth={1.8} /></span>
    <span className="chat-assistant-body"><span /></span>
    <span className="chat-assistant-arm" />
    <span className="chat-assistant-wave"><Hand strokeWidth={1.8} /></span>
    <span className="chat-assistant-feet" />
  </span>
);
