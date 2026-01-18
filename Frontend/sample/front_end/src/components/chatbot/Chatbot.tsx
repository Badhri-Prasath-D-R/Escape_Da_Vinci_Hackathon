import { useState } from "react";
import "../../styles/global.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi 👋 I’m CrisisTruth AI. Paste a news text or URL to verify.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // 🔹 MOCK RESPONSE (replace with API call)
    setTimeout(() => {
      const botMessage: Message = {
        sender: "bot",
        text:
          "⚠️ This news appears to be FAKE.\n\nReason:\nNo official confirmation from trusted sources.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message bot">
            ⏳ Verifying with trusted sources...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Paste news text or URL here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
