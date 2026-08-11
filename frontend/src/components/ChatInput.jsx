export default function ChatInput({ input, setInput, sendMessage, isLoading }) {
  return (
    <div className="chat-input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage} disabled={isLoading}>
        Отправить
      </button>
    </div>
  );
}
