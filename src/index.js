import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import Grocery from "./models/Grocery.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // allow React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// ✅ Example: Create grocery item(s)
app.post("/submit", async (req, res) => {
  try {
    let data = req.body; // { item: "Apple" } OR [{ item: "Apple" }, { item: "Banana" }]

    // Normalize so insertMany always gets an array
    if (!Array.isArray(data)) {
      data = [data];
    }

    const newUser = await Grocery.insertMany(data);

    res.json({
      message: "User(s) created successfully ✅",
      items: newUser.map((i) => i.item),
    }); // ✅ Always send JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // ✅ JSON for errors too
  }
});

// ✅ get all grocery items
app.get("/submit", async (req, res) => {
  try {
    const items = await Grocery.find(); // returns array of documents
    res.json(items); // safe to send
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
