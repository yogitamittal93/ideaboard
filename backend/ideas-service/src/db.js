import pkg from "pg";
const { Pool } = pkg;

// Configuration object starts with the basic connection string
let poolConfig = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    poolConfig.ssl = {
        // This setting allows Render to connect to its own hosted database,
        // which may use self-signed certificates.
        rejectUnauthorized: false
    };
}
// --- END FIX ---

const pool = new Pool(poolConfig);

export default pool;
