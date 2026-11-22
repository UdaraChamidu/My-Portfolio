import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatMessage = ({ text }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    a: ({ href, children }) => <a href={href} className="underline underline-offset-2" target={href?.startsWith("#") || href?.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">{children}</a>,
  }}>{text}</ReactMarkdown>
);

ChatMessage.propTypes = { text: PropTypes.string.isRequired };
