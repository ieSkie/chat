import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  async function sendMessage() {
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: data.reply },
    ]);
  }
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Отправить</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.role}: <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
