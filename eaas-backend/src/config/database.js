import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// SSL configuration for Supabase
// Always use SSL for Supabase connections and handle self-signed certificates
const isSupabase = process.env.DATABASE_URL?.includes('supabase') || process.env.DATABASE_URL?.includes('pooler.supabase.com');
const isProduction = process.env.NODE_ENV === 'production';

// Use SSL for Supabase or in production, and accept self-signed certificates
// For Supabase, we need to explicitly set SSL and accept self-signed certs
let sslConfig = false;
if (isSupabase || isProduction) {
  sslConfig = {
    rejectUnauthorized: false  // Accept self-signed certificates from Supabase
  };
}

// Parse connection string to remove SSL params (we'll handle SSL in Pool config)
let connectionString = process.env.DATABASE_URL || '';
// Remove sslmode from connection string if present (we handle it in Pool config)
connectionString = connectionString.replace(/[?&]sslmode=[^&]*/gi, '');

const pool = new Pool({
  connectionString: connectionString,
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

