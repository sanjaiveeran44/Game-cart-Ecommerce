import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'gamecart';
const DB_PORT = process.env.DB_PORT || 3306;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Please define DB_HOST, DB_USER, and DB_NAME environment variables inside .env.local');
}

let cached = global.mysql;

if (!cached) {
  cached = global.mysql = { pool: null, connected: false };
}

async function connectDB() {
  if (cached.connected && cached.pool) {
    console.log('MySQL already connected');
    return cached.pool;
  }

  if (!cached.pool) {
    const poolConfig = {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
      charset: 'utf8mb4',
    };

    try {
      cached.pool = mysql.createPool(poolConfig);
      
      const connection = await cached.pool.getConnection();
      await connection.ping();
      connection.release();
      
      cached.connected = true;
      console.log('MySQL connected successfully');
      return cached.pool;
    } catch (error) {
      console.error('MySQL connection error:', error);
      cached.pool = null;
      cached.connected = false;
      throw error;
    }
  }

  return cached.pool;
}

process.on('SIGINT', async () => {
  try {
    if (cached.pool) {
      await cached.pool.end();
      console.log('MySQL connection closed through app termination');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error closing MySQL connection:', error);
    process.exit(1);
  }
});

export default connectDB;
