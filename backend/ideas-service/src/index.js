import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import ideasRouter from "./routes.js";

const { Pool } = pkg;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}
initDB();

// Mount main router
app.use("/ideas", ideasRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Ideas Service running on port ${PORT}`));
