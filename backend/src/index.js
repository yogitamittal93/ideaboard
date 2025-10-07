require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper function to initialize DB table
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ideas (
      id SERIAL PRIMARY KEY,
      text VARCHAR(280) NOT NULL,
      upvotes INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("DB initialized");
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// GET all ideas
app.get('/api/ideas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ideas ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST new idea
app.post('/api/ideas', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text || text.length > 280) return res.status(400).json({ error: 'Text required and max 280 chars' });

  try {
    const { rows } = await pool.query(
      'INSERT INTO ideas (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST upvote idea
app.post('/api/ideas/:id/upvote', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const { rows } = await pool.query(
      'UPDATE ideas SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Idea not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  await initDB();
  console.log(`Backend running on port ${port}`);
});


// Healthcheck endpoint for Docker & Kubernetes
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
