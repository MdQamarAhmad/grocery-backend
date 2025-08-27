import { Router } from "express";
import Score from "../models/Score.js";
import auth from "../middleware/auth.js";

const router = Router();

// Public leaderboard (top 25)
router.get("/", async (_req, res) => {
  const rows = await Score.find().sort({ score: -1 }).limit(25).select("-__v");
  res.json(rows);
});

// Submit a score (auth)
router.post("/", auth, async (req, res) => {
  const { score, distance, tricks } = req.body || {};
  if (![score, distance, tricks].every(n => Number.isFinite(n))) {
    return res.status(400).json({ error: "numeric score, distance, tricks required" });
  }
  const row = await Score.create({
    userId: req.user.id,
    username: req.user.username,
    score, distance, tricks
  });
  res.status(201).json(row);
});

export default router;

