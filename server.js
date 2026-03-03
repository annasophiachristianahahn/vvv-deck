const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Presets are stored in DATA_DIR/presets.json.
// For persistence across Railway redeploys, mount a Volume at /data
// and set the env var DATA_DIR=/data in the Railway service settings.
const DATA_DIR    = process.env.DATA_DIR || path.join(__dirname, 'data');
const PRESETS_FILE = path.join(DATA_DIR, 'presets.json');

app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// GET /api/presets — return preset list
app.get('/api/presets', (req, res) => {
  try {
    if (!fs.existsSync(PRESETS_FILE)) return res.json([]);
    const data = fs.readFileSync(PRESETS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (e) {
    console.error('Error reading presets:', e.message);
    res.json([]);
  }
});

// POST /api/presets — replace preset list (body = JSON array)
app.post('/api/presets', (req, res) => {
  try {
    const list = Array.isArray(req.body) ? req.body : [];
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(list, null, 2));
    res.json({ ok: true });
  } catch (e) {
    console.error('Error saving presets:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`VVV deck running on http://localhost:${PORT}`);
});
