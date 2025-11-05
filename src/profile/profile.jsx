import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile({ onLogout, userName }) {
  const navigate = useNavigate();

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


