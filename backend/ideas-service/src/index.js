import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js"; 
import ideasRouter from "./routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


async function initDB() {
  try {
    await pgPool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL successfully");
  } catch (err) {
    // Log the full error to help debug deployment issues
    console.error("❌ Database connection failed:", err); 
    process.exit(1);
  }
}
initDB();

// Mount main router
app.use("/", ideasRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Ideas Service running on port ${PORT}`));