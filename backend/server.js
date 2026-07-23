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

// In-memory store fallback when PostgreSQL DB is unavailable
const inMemoryContacts = [
  {
    id: 1,
    name: 'Sakthi Developer',
    email: 'sakthi@sadugudustudios.com',
    phone: '+91 98765 43210',
    message: 'Welcome to Sadugudu Studios! Ready to create immersive game experiences.',
    created_at: new Date().toISOString()
  }
];

let isDbConnected = false;

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/sadugudustudios',
  ssl: process.env.DATABASE_URL?.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : false,
});

// Initialize database table if not exists
const initDb = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set. Running with fallback memory store.');
    return;
  }
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
    isDbConnected = true;
    console.log('✅ PostgreSQL contacts table initialized');
  } catch (err) {
    console.warn('⚠️ Database init notice:', err.message);
  }
};

initDb();

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sadugudu Studios Express API', dbConnected: isDbConnected });
});

// GET /api/contacts & /api/contacts/ - Fetch all contact submissions
app.get(['/api/contacts', '/api/contacts/'], async (req, res) => {
  if (process.env.DATABASE_URL) {
    try {
      const result = await pool.query(
        'SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY id DESC'
      );
      return res.json(result.rows);
    } catch (err) {
      console.error('Error fetching contacts from DB, returning memory fallback:', err.message);
    }
  }
  return res.json(inMemoryContacts);
});

// POST /api/contacts & /api/contacts/ - Submit a new contact message
app.post(['/api/contacts', '/api/contacts/'], async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ detail: 'Name, email, and message are required' });
  }

  if (process.env.DATABASE_URL) {
    try {
      const result = await pool.query(
        'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, phone || '', message]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error inserting contact to DB, using memory fallback:', err.message);
    }
  }

  const newContact = {
    id: inMemoryContacts.length + 1,
    name,
    email,
    phone: phone || '',
    message,
    created_at: new Date().toISOString()
  };
  inMemoryContacts.unshift(newContact);
  return res.status(201).json(newContact);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sadugudu Studios Express API',
    health: '/api/health',
    contacts: '/api/contacts/'
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
  });
}

export default app;
