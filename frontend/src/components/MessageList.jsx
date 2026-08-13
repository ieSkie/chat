import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { useState } from "react";

export default function MessageList(props) {
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState();
  function handleScroll() {
    const el = containerRef.current;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollButton(distanceFromBottom > 50);
  }
  function scrollToBottom() {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
  return (
    <div
      className="messages-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {props.messages.length === 0 ? (
        <div className="empty-state">Задайте свой первый вопрос!</div>
      ) : (
        <>
          {props.messages.map((msg, index) => (
            <div className={`message ${msg.role}`} key={index}>
              {msg.role}: <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {props.isLoading && (
            <div className="message bot">Бот печатает...</div>
          )}
        </>
      )}
      {showScrollButton && (
        <button className="scroll-button" onClick={scrollToBottom}>
          ↓
        </button>
      )}
    </div>
  );
}
