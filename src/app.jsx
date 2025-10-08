import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Chat } from './chat/chat';
import { Profile } from './profile/profile';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <h1>EduQuest<sup>&reg;</sup></h1>
          <nav>
            <menu>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/chat">Chat</NavLink></li>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </menu>
          </nav>
          <hr />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer>
          <hr />
          <span className="text-reset">Rai Katsuragawa</span>
          <br />
          <a className="text-reset" href="https://github.com/katsu-rai/cs260-rkatsura" target="_blank" rel="noreferrer">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}