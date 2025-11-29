import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// SSL configuration for Supabase
// Always use SSL in production, and handle self-signed certificates
const sslConfig = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('supabase') 
  ? { 
      rejectUnauthorized: false  // Accept self-signed certificates from Supabase
    } 
  : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully');
  }
});

export default pool;

