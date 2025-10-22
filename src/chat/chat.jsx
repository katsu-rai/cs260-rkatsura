import React, { useState } from 'react';
import './chat.css';

export function Chat() {
  const [messages, setMessages] = useState(["Welcome to EduQuest chat!"]);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, value]);
    setText("");
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


