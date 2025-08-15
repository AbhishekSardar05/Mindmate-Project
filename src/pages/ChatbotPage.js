import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/chatbot.css";

const API = "http://localhost:5000/api/ai/chat";

export default function ChatbotPage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I support your mind wellness today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages(msgs => [...msgs, { sender: "bot", text: data.reply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <section className="chatbot-container">
      <h2>MindMate AI Chat</h2>
      <div className="chat-window">
        {messages.map((msg, i) =>
          <div key={i} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
        )}
        {loading && <div className="chat-msg bot">...</div>}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." required autoFocus />
        <button className="btn-primary" type="submit">Send</button>
      </form>
    </section>
  );
}
