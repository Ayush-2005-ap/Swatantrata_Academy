import dotenv from "dotenv";
dotenv.config(); // 👈 MUST BE FIRST LINE

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Swatantra Chatbot Backend Running 🚀");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
