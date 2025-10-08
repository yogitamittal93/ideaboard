import pkg from "pg";
const { Pool } = pkg;

// --- FIX: Force SSL to resolve 'SSL/TLS required' error on cloud hosts ---
const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    // Add the SSL object directly, forcing it for all environments that have DATABASE_URL set.
    ssl: {
        // This is necessary because Render's DB uses self-signed certificates.
        rejectUnauthorized: false
    }
};
// --- END FIX ---

const pool = new Pool(poolConfig);

export default pool;
