import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username & password required" });
  const exists = await User.findOne({ username });
  if (exists) return res.status(409).json({ error: "username taken" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });
  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET || "devsecret", { expiresIn: "14d" });
  res.json({ token, username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "bad credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "bad credentials" });
  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET || "devsecret", { expiresIn: "14d" });
  res.json({ token, username });
});

export default router;

