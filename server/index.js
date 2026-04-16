import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { initDb } from './db.js';
import authRouter from './routes/auth.js';
import i18nRouter from './routes/i18n.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const isProd = process.env.NODE_ENV === 'production';

initDb();

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json({ limit: '200kb' }));

if (isProd) {
  const dist = path.join(__dirname, '..', 'dist');
  app.use(express.static(dist, { index: false }));
}

app.use('/api/auth', authRouter);
app.use('/api/i18n', i18nRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'maaya-bazaar-api' });
});

if (isProd) {
  const dist = path.join(__dirname, '..', 'dist');
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(dist, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Internal server error' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[maaya-api] listening on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

export default app;
