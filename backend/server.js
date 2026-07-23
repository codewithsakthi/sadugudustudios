import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : false,
});

// Initialize database table if not exists
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ PostgreSQL contacts table initialized');
  } catch (err) {
    console.warn('⚠️ Database init notice:', err.message);
  }
};

initDb();

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sadugudu Studios Express API' });
});

// GET /api/contacts/ - Fetch all contact submissions
app.get('/api/contacts/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ detail: 'Failed to fetch contact submissions from PostgreSQL' });
  }
});

// POST /api/contacts/ - Submit a new contact message
app.post('/api/contacts/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ detail: 'Name, email, and message are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone || '', message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting contact:', err);
    res.status(500).json({ detail: 'Failed to save contact submission to PostgreSQL' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sadugudu Studios Express API',
    health: '/api/health',
    contacts: '/api/contacts/'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
});
