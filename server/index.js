import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Swatantra Chatbot Backend Running 🚀");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
