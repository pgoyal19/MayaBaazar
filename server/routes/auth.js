import { Router } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { getDb } from '../db.js';

const router = Router();
const SESSION_COOKIE = 'maaya_session';
const SESSION_DAYS = 7;
const BCRYPT_ROUNDS = 10;

const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClient = googleClientId ? new OAuth2Client(googleClientId) : null;

function normalizeRole(raw) {
  const r = String(raw || '').toLowerCase();
  return r === 'seller' ? 'seller' : 'buyer';
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    joinedAt: row.created_at,
    role: normalizeRole(row.role),
  };
}

function getSessionUser(sessionId) {
  if (!sessionId) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT u.id, u.email, u.name, u.created_at, u.role, s.expires_at AS session_expires
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = ?`
    )
    .get(sessionId);
  if (!row) return null;
  if (new Date(row.session_expires) <= new Date()) {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
    return null;
  }
  return row;
}

function setSessionCookie(res, userId) {
  const db = getDb();
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').run(sessionId, userId, expires);
  res.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_DAYS * 864e5,
    path: '/',
  });
}

router.get('/me', (req, res) => {
  const row = getSessionUser(req.cookies[SESSION_COOKIE]);
  if (!row) return res.json({ user: null });
  res.json({ user: publicUser(row) });
});

router.post('/register', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!name) return res.status(400).json({ ok: false, message: 'Please enter your name.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, message: 'Please enter a valid email.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: 'Password must be at least 6 characters.' });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ ok: false, message: 'An account with this email already exists.' });
    }

    const role = normalizeRole(req.body?.role);
    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const info = db
      .prepare('INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)')
      .run(email, name, password_hash, role);

    setSessionCookie(res, info.lastInsertRowid);

    const user = db.prepare('SELECT id, email, name, created_at, role FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ ok: true, user: publicUser(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Server error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and password are required.' });
    }

    const db = getDb();
    const user = db.prepare('SELECT id, email, name, password_hash, created_at, role FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ ok: false, message: 'No account found for this email.' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ ok: false, message: 'Incorrect password.' });
    }

    setSessionCookie(res, user.id);

    res.json({ ok: true, user: publicUser(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Server error. Please try again.' });
  }
});

router.post('/google', async (req, res) => {
  try {
    if (!googleClient || !googleClientId) {
      return res.status(503).json({
        ok: false,
        message: 'Google sign-in is not configured. Set GOOGLE_CLIENT_ID in the server .env file.',
      });
    }

    const credential = String(req.body?.credential || '');
    if (!credential) {
      return res.status(400).json({ ok: false, message: 'Missing Google credential.' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ ok: false, message: 'Google did not return an email.' });
    }

    const email = String(payload.email).toLowerCase();
    const name = String(payload.name || payload.email.split('@')[0] || 'User').trim();
    const sub = String(payload.sub || '');
    const role = normalizeRole(req.body?.role);

    const db = getDb();
    let user = db.prepare('SELECT id, email, name, created_at, role, google_id FROM users WHERE google_id = ?').get(sub);
    if (!user) {
      user = db.prepare('SELECT id, email, name, created_at, role, google_id FROM users WHERE email = ?').get(email);
    }

    if (user) {
      if (sub && !user.google_id) {
        try {
          db.prepare('UPDATE users SET google_id = ? WHERE id = ?').run(sub, user.id);
        } catch (err) {
          console.warn('Could not save google_id:', err.message);
        }
      }
      setSessionCookie(res, user.id);
      const fresh = db.prepare('SELECT id, email, name, created_at, role FROM users WHERE id = ?').get(user.id);
      return res.json({ ok: true, user: publicUser(fresh) });
    }

    const randomPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), BCRYPT_ROUNDS);
    const info = db
      .prepare(
        `INSERT INTO users (email, name, password_hash, role, google_id) VALUES (?, ?, ?, ?, ?)`
      )
      .run(email, name, randomPassword, role, sub || null);

    setSessionCookie(res, info.lastInsertRowid);
    const created = db.prepare('SELECT id, email, name, created_at, role FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ ok: true, user: publicUser(created) });
  } catch (e) {
    console.error('Google auth error:', e);
    const msg = e?.message?.includes('Token used too late')
      ? 'Session expired. Please try Google sign-in again.'
      : 'Google sign-in failed. Check GOOGLE_CLIENT_ID matches your web client.';
    res.status(401).json({ ok: false, message: msg });
  }
});

router.post('/logout', (req, res) => {
  const sessionId = req.cookies[SESSION_COOKIE];
  if (sessionId) {
    try {
      getDb().prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
    } catch (e) {
      console.error(e);
    }
  }
  res.clearCookie(SESSION_COOKIE, { path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ ok: true });
});

export default router;
export { SESSION_COOKIE, getSessionUser };
