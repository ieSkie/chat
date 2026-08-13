export default function ChatInput({ input, setInput, sendMessage, isLoading }) {
  return (
    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
        onKeyDown={(event) => {
          if (event.key === "Enter" && !isLoading) {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage} disabled={isLoading}>
        Отправить
      </button>
    </div>
  );
}
