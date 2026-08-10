import ReactMarkdown from "react-markdown";

export default function MessageList(props) {
  return (
    <div>
      {props.messages.map((msg, index) => (
        <div key={index}>
          {msg.role}: <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
