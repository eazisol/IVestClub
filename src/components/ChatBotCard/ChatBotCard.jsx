import React, { useState } from "react";
import { baseUrl } from "../../../apiConfig";

const ChatBotCard = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "What is Ivest Club?",
    "How do I join a membership club?",
    "What does 'Token Sent' mean?",
    "How do I connect my wallet?",
    "What does 'Joined' status mean?",
    "Can I see token metadata?",
  ];

  const sendMessage = async (question = input) => {
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}gemini-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();
      const botMsg = { role: "bot", text: data.reply || "No response." };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    sendMessage(text);
  };

  return (
    <div className="card card-border-c mt-4">
      <div className="card-body p-2 p-xl-5">
        <h5 className="text-dark mont-font">
          <strong>Ivest Club Chat Assistant</strong>
        </h5>

        <div className="mt-3">
          {suggestions.map((text, index) => (
            <div
              className="d-flex mt-2 align-items-center"
              key={index}
              onClick={() => handleSuggestionClick(text)}
              style={{
                cursor: "pointer",
                padding: "8px",
                background: "#f5f5f5",
                borderRadius: "6px",
              }}
            >
              <div className="col-1 pl-0">
                <h6 className="text-warning mb-0">{">"}</h6>
              </div>
              <div className="col-11 pl-0">
                <h6 className="mb-0 h6 mont-font">{text}</h6>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div
          style={{
            height: "240px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            marginBottom: "1rem",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.role === "user" ? "text-primary" : "text-success"
              }`}
            >
              <b>{msg.role === "user" ? "You" : "Chotu"}:</b> {msg.text}
            </div>
          ))}
          {loading && <div className="text-muted">Chotu is typing...</div>}
        </div>

        <div className="d-flex">
          <input
            className="form-control mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about Ivest Club..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-warning" onClick={() => sendMessage()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotCard;
