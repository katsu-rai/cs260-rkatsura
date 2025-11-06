import React, { useState } from 'react';
import './chat.css';

export function Chat() {
  const [messages, setMessages] = useState(["Welcome to EduQuest chat!"]);
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, `You: ${value}`]);
    setText("");
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: value }),
      });
      const data = await resp.json();
      const reply = data?.reply || 'Sorry, no response.';
      setMessages((prev) => [...prev, `Bot: ${reply}`]);
    } catch (err) {
      setMessages((prev) => [...prev, 'Bot: There was an error contacting the chat service.']);
    }
  }

  return (
    <main>
      <h1>Chat</h1>
      <section>
        <p>Messages will appear below (placeholder):</p>
        <ul id="messages">
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="message"
              placeholder="Type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}


