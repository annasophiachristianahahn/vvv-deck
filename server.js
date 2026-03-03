const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Postgres (permanent, shared across all visitors) ─────────────────────────
// DATABASE_URL is auto-injected by Railway when a Postgres service is linked.
// Falls back to file-based storage when running locally without DATABASE_URL.
let pool = null;
if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  // Ensure the table exists
  pool.query(`
    CREATE TABLE IF NOT EXISTS vvv_presets (
      id   INT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL DEFAULT '[]'
    )
  `).then(() => {
    // Seed the row if it doesn't exist yet
    return pool.query(`
      INSERT INTO vvv_presets (id, data) VALUES (1, '[]')
      ON CONFLICT (id) DO NOTHING
    `);
  }).catch(err => console.error('DB init error:', err.message));
}

// ── File-based fallback (local dev / no DATABASE_URL) ────────────────────────
const DATA_DIR    = process.env.DATA_DIR || path.join(__dirname, 'data');
const PRESETS_FILE = path.join(DATA_DIR, 'presets.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── Express setup ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(__dirname, { extensions: ['html'] }));

// GET /api/presets — return preset list
app.get('/api/presets', async (req, res) => {
  if (pool) {
    try {
      const result = await pool.query('SELECT data FROM vvv_presets WHERE id = 1');
      return res.json(result.rows.length ? result.rows[0].data : []);
    } catch (e) {
      console.error('DB read error:', e.message);
    }
  }
  // Fallback: file
  try {
    if (!fs.existsSync(PRESETS_FILE)) return res.json([]);
    return res.json(JSON.parse(fs.readFileSync(PRESETS_FILE, 'utf8')));
  } catch (e) {
    console.error('File read error:', e.message);
    return res.json([]);
  }
});

// POST /api/presets — replace preset list (body = JSON array)
app.post('/api/presets', async (req, res) => {
  const list = Array.isArray(req.body) ? req.body : [];
  if (pool) {
    try {
      await pool.query(
        'UPDATE vvv_presets SET data = $1 WHERE id = 1',
        [JSON.stringify(list)]
      );
      return res.json({ ok: true });
    } catch (e) {
      console.error('DB write error:', e.message);
    }
  }
  // Fallback: file
  try {
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(list, null, 2));
    return res.json({ ok: true });
  } catch (e) {
    console.error('File write error:', e.message);
    return res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  const mode = pool ? 'Postgres (permanent)' : 'file (local dev)';
  console.log(`VVV deck running on http://localhost:${PORT} — presets stored in ${mode}`);
});
