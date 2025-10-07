import express from "express";
import pool from "./db.js";

const router = express.Router();

router.post("/votes/:ideaId", async (req, res) => {
  try {
    const ideaId = parseInt(req.params.ideaId);
    if (!ideaId) return res.status(400).json({ error: "Invalid idea ID" });

    const voteCheck = await pool.query("SELECT * FROM votes WHERE idea_id=$1", [ideaId]);
    if (voteCheck.rows.length === 0) {
      const { rows } = await pool.query("INSERT INTO votes(idea_id, count) VALUES($1, 1) RETURNING *", [ideaId]);
      return res.json(rows[0]);
    }

    const { rows } = await pool.query(
      "UPDATE votes SET count = count + 1 WHERE idea_id=$1 RETURNING *",
      [ideaId]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upvote" });
  }
});

router.get("/votes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM votes");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch votes" });
  }
});

export default router;
