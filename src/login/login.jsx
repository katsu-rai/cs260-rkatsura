import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = useState(userName || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onAuthChange(email || 'StudentUser', 'Authenticated');
    navigate('/chat');
  }
  return (
    <main>
      <h1>Welcome to EduQuest</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <span>@</span>
          <input type="text" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}


