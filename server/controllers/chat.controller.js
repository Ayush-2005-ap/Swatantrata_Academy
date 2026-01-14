import Groq from "groq-sdk";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        reply: "Server misconfigured (API key missing)",
      });
    }

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // ✅ Initialize Groq INSIDE function
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are Swatantra Academy Assistant. Be polite, concise, and helpful.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("🔥 Groq Error:", error);
    res.status(500).json({
      reply: "⚠️ Server error. Please try again.",
    });
  }
};
