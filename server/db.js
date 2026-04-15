import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, 'maaya.sqlite');

let db;

export function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDb() first.');
  return db;
}

function seedDemoUsers(database) {
  const demos = [
    { email: 'demo@maaya.bazaar', name: 'Demo Shopper', password: 'Demo1234!', role: 'buyer' },
    { email: 'demo.seller@maaya.bazaar', name: 'Demo Artisan', password: 'Demo1234!', role: 'seller' },
  ];
  for (const d of demos) {
    const existing = database.prepare('SELECT id FROM users WHERE email = ?').get(d.email);
    if (existing) continue;
    const password_hash = bcrypt.hashSync(d.password, 10);
    database
      .prepare('INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)')
      .run(d.email, d.name, password_hash, d.role);
  }
}

export function initDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
  `);

  const now = Date.now();
  const expired = db.prepare('SELECT id, expires_at FROM sessions').all();
  const del = db.prepare('DELETE FROM sessions WHERE id = ?');
  for (const s of expired) {
    if (new Date(s.expires_at).getTime() <= now) del.run(s.id);
  }

  let cols = db.prepare('PRAGMA table_info(users)').all();
  if (!cols.some((c) => c.name === 'role')) {
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'buyer'`);
  }
  cols = db.prepare('PRAGMA table_info(users)').all();
  if (!cols.some((c) => c.name === 'google_id')) {
    try {
      db.exec(`ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE`);
    } catch {
      /* ignore if duplicate migration */
    }
  }

  seedDemoUsers(db);

  return db;
}
