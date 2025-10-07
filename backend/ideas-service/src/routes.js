import express from "express";
import { pool } from "./index.js";

const router = express.Router();

/**
 * GET /ideas
 * Fetch all ideas, most recent first
 */
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, text, upvotes, created_at FROM ideas ORDER BY created_at DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Fetch ideas error:", err.message);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});

/**
 * POST /ideas
 * Create a new idea (max 280 characters)
 */
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0 || text.length > 280) {
      return res.status(400).json({ error: "Invalid idea text (1-280 characters)" });
    }

    const { rows } = await pool.query(
      "INSERT INTO ideas(text, upvotes) VALUES($1, 0) RETURNING id, text, upvotes, created_at",
      [text.trim()]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("❌ Create idea error:", err.message);
    res.status(500).json({ error: "Failed to create idea" });
  }
});

/**
 * POST /ideas/:id/upvote
 * Increment upvote count for an idea
 */
router.post("/:id/upvote", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      "UPDATE ideas SET upvotes = upvotes + 1 WHERE id = $1 RETURNING id, text, upvotes, created_at",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Idea not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Upvote error:", err.message);
    res.status(500).json({ error: "Failed to upvote idea" });
  }
});

export default router;
