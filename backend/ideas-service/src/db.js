import pkg from "pg";
const { Pool } = pkg;

// Configuration object starts with the basic connection string
const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    // --- FIX: Force SSL to resolve 'SSL/TLS required' error on cloud hosts ---
    ssl: {
        // This is necessary because Render's DB uses self-signed certificates.
        rejectUnauthorized: false
    }
    // --- END FIX ---
};

const pool = new Pool(poolConfig);

export default pool;