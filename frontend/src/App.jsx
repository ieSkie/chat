import { useState } from "react";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

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
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      <MessageList messages={messages} />
    </div>
  );
}

export default App;
