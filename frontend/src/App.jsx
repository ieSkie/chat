import { useState } from "react";
import "./App.css";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function sendMessage() {
    if (!input.trim()) return;
    setIsLoading(true);
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
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
    setIsLoading(false);
  }
  return (
    <div className="chat-app">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
