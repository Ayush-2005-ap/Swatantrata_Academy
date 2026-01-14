import { GoogleGenerativeAI } from "@google/generative-ai";

export const handleChat = async (req, res) => {
  try {
    // 1. Initialize the client INSIDE the function
    // This prevents the "undefined key" error on server startup
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables");
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // 2. Setup the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // 3. Generate content
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({
      reply: "Gemini error. Please try again.",
    });
  }
};