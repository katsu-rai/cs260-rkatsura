import React from 'react';
import './profile.css';

export function Profile() {
  return (
    <main>
      <h1>Profile</h1>
      <section>
        <p>Your account details (placeholder):</p>
        <div>
          <img src="./source/images/placeholder.png" alt="Profile picture" width="96" height="96" />
          <ul>
            <li><strong>Username:</strong> StudentUser</li>
            <li><strong>Email:</strong> student@example.com</li>
            <li><strong>Status:</strong> Signed in (placeholder)</li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Bio</h2>
        <p>Learning enthusiast exploring courses and quizzes on EduQuest.</p>
      </section>
    </main>
  );
}


