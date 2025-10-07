import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  // Simple idea object (replace with DB save if needed)
  const idea = { id: Date.now(), text };
  res.status(201).json(idea);
});

export default router;
