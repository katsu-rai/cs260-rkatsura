import React from 'react';
import './chat.css';

export function Chat() {
  return (
    <main>
      <h1>Chat</h1>
      <section>
        <p>Messages will appear below (placeholder):</p>
        <ul id="messages">
          <li>Welcome to EduQuest chat!</li>
        </ul>
      </section>
      <section>
        <form method="get" action="chat.html">
          <div>
            <input type="text" name="message" placeholder="Type a message" />
          </div>
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}


