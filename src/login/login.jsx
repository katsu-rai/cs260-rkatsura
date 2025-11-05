import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = useState(userName || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) throw new Error('Login failed');
      onAuthChange(email || 'StudentUser', 'Authenticated');
      navigate('/chat');
    } catch (err) {
      setError('Login failed. Please check your email or password.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    setError("");
    setLoading(true);
    try {
      const resp = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) throw new Error('Sign up failed');
      onAuthChange(email || 'StudentUser', 'Authenticated');
      navigate('/chat');
    } catch (err) {
      setError('Sign up failed. Try a different email.');
    } finally {
      setLoading(false);
    }
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
        <button type="submit" disabled={loading}>{loading ? 'Working...' : 'Login'}</button>
        <button type="button" onClick={handleSignup} disabled={loading}>Sign Up</button>
      </form>
      {error && <p style={{ color: '#b00020', marginTop: '0.5rem' }}>{error}</p>}
    </main>
  );
}


