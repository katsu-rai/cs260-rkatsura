import React from 'react';

export function Login() {
  return (
    <main>
      <h1>Welcome to EduQuest</h1>
      <form method="get" action="chat.html">
        <div>
          <span>@</span>
          <input type="text" placeholder="your@email.com" />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}


