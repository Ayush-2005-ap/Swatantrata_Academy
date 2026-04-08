import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import programRoutes from "./routes/program.routes.js";
import eventRoutes from "./routes/event.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import authRoutes from "./routes/auth.routes.js";
import memberRoutes from "./routes/member.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI is not defined in .env");
} else {
  const connectionTimer = setTimeout(() => {
    console.warn("⏳ Still attempting to connect to MongoDB... If this takes more than 30 seconds, please check your Atlas IP Whitelist (add 0.0.0.0/0 for testing).");
  }, 10000);

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      clearTimeout(connectionTimer);
      console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
      clearTimeout(connectionTimer);
      console.error("❌ MongoDB Connection Error:", err);
    });
}

app.use("/api/chat", chatRoutes);
app.use("/api", contactRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("Swatantra Chatbot Backend Running 🚀");
});

const PORT = process.env.PORT || 5050;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    message: "Server is healthy 🚀",
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
