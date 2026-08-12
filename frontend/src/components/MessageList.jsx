import ReactMarkdown from "react-markdown";

export default function MessageList(props) {
  return (
    <div className="messages-container">
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
    </div>
  );
}
