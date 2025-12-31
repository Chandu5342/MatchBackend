import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import matchRoutes from "./routes/match.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/matches", matchRoutes);

// test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend server is running successfully 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
