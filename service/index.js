require('dotenv').config();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const path = require('path');

const app = express();
const authCookieName = 'token';

let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Test endpoint
apiRouter.get('/helloworld', (_req, res) => {
  res.send({ message: 'hello world' });
});

apiRouter.post('/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    res.status(400).send({ msg: 'Missing message' });
    return;
  }
  try {
    if (process.env.OPENAI_API_KEY) {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are EduOwl, a friendly study buddy. Keep replies to 1-2 sentences.' },
            { role: 'user', content: message },
          ],
        }),
      });
      const data = await r.json();
      const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I do not have an answer.';
      res.send({ reply });
    } else {
      const r = await fetch('https://api.adviceslip.com/advice');
      const data = await r.json();
      const reply = data?.slip?.advice || 'Keep going. You can do it!';
      res.send({ reply });
    }
  } catch (e) {
    res.status(500).send({ msg: 'Chat provider error', error: e.message });
  }
});

// Create account
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).send({ msg: 'Missing email or password' });
    return;
  }
  if (await findUser('email', email)) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }
  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await findUser('email', email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Helper: verify auth (can be used to protect routes)
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) return next();
  res.status(401).send({ msg: 'Unauthorized' });
};

apiRouter.get('/auth/me', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  res.send({ email: user.email });
});

// Default error handler
app.use(function (err, _req, res, _next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// SPA fallback
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Helpers
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: isProduction,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


