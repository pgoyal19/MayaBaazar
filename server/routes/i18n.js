import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '..', 'i18n');

const router = Router();

function safeLocale(raw) {
  const s = String(raw || '').toLowerCase();
  if (!/^[a-z]{2}(-[a-z]{2,8})?$/.test(s)) return null;
  return s.length > 12 ? null : s;
}

router.get('/locales', (_req, res) => {
  try {
    const manifestPath = path.join(i18nDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      return res.status(500).json({ ok: false, message: 'i18n manifest missing' });
    }
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    res.json({
      ok: true,
      defaultLocale: manifest.defaultLocale || 'en',
      locales: Array.isArray(manifest.locales) ? manifest.locales : [],
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Could not read locales manifest' });
  }
});

router.get('/bundles/:locale', (req, res) => {
  const locale = safeLocale(req.params.locale);
  if (!locale) {
    return res.status(400).json({ ok: false, message: 'Invalid locale code' });
  }
  const filePath = path.join(i18nDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, message: `No bundle for locale "${locale}"` });
  }
  try {
    const messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (typeof messages !== 'object' || messages === null || Array.isArray(messages)) {
      return res.status(500).json({ ok: false, message: 'Invalid bundle format' });
    }
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ ok: true, locale, messages });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: 'Could not read translation bundle' });
  }
});

export default router;
