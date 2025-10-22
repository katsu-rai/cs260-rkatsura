import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Mock auth then navigate to chat
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


