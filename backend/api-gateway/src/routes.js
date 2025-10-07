import express from "express";
import axios from "axios";

const router = express.Router();

// Base URL for ideas microservice
const IDEAS_SERVICE = process.env.IDEAS_SERVICE_URL || "http://localhost:5001";

/**
 * GET /ideas
 */
router.get("/ideas", async (req, res) => {
  try {
    const response = await axios.get(`${IDEAS_SERVICE}/ideas`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("❌ API Gateway fetch ideas error:", err.message);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});

/**
 * POST /ideas
 */
router.post("/ideas", async (req, res) => {
  try {
    // Extract title and text from the incoming request
    const { title, text } = req.body;

    // Forward to Ideas Service
    const response = await axios.post(`${IDEAS_SERVICE}/ideas`, { title, text });

    res.json(response.data);
  } catch (err) {
    console.error("Ideas Service error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create idea" });
  }
});


/**
 * POST /ideas/:id/upvote
 */
router.post("/ideas/:id/upvote", async (req, res) => {
  try {
    const response = await axios.post(`${IDEAS_SERVICE}/ideas/${req.params.id}/upvote`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("❌ API Gateway upvote error:", err.message);
    res.status(500).json({ error: "Failed to upvote idea" });
  }
});

export default router;
