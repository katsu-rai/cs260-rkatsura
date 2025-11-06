import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile({ onLogout, userName }) {
  const navigate = useNavigate();
  const [sessionMsg, setSessionMsg] = useState('Checking session...');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const r = await fetch('/api/auth/me', { credentials: 'include' });
        if (!ignore) {
          if (r.ok) {
            const data = await r.json();
            setSessionMsg(`Signed in as ${data.email || userName || 'user'}`);
          } else {
            setSessionMsg('Not signed in');
          }
        }
      } catch {
        if (!ignore) setSessionMsg('Unable to check session');
      }
    })();
    return () => { ignore = true; };
  }, [userName]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      // ignore errors, still clear client state
    }
    if (onLogout) onLogout();
    navigate('/');
  }
  return (
    <main>
      <h1>Profile</h1>
      <p style={{ color: '#5f6c7b', marginTop: '0.25rem' }}>{sessionMsg}</p>
      <section>
        <p>Your account details (placeholder):</p>
        <div>
          <img src="./source/images/placeholder.png" alt="Profile picture" width="96" height="96" />
          <ul>
            <li><strong>Username:</strong> {userName || 'StudentUser'}</li>
            <li><strong>Email:</strong> student@example.com</li>
            <li><strong>Status:</strong> Signed in (placeholder)</li>
          </ul>
        </div>
        <button className="edit-btn" onClick={handleLogout}>Logout</button>
      </section>
      <section>
        <h2>Bio</h2>
        <p>Learning enthusiast exploring courses and quizzes on EduQuest.</p>
      </section>
    </main>
  );
}


