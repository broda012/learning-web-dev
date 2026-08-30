"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me about our services, service areas, or pricing.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      const replyText = res.ok
        ? data.reply
        : data.error || "Something went wrong.";

      setMessages((prev) => [...prev, { role: "assistant", text: replyText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again or call us.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-lg shadow-xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 font-semibold">
            Ask us anything
          </div>

          <div className="flex-1 max-h-96 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-slate-100 text-slate-900 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-slate-400 self-start">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex border-t border-slate-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl"
        aria-label="Toggle chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
