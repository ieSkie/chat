export default function ChatInput({ input, setInput, sendMessage }) {
  return (
    <div className="chat-input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}
