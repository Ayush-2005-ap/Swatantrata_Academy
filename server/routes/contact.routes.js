import express from "express";
import { sendMail } from "../utils/mailer.js";
import Inquiry from "../models/Inquiry.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail({ name, email, phone, subject, message });

    // Save to Database for Admin Inbox
    const newInquiry = new Inquiry({ name, email, phone, subject, message });
    await newInquiry.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// 📌 Get all inquiries (Admin Only)
router.get("/inquiries", protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries." });
  }
});

// 📌 Mark inquiry as read (Admin Only)
router.put("/inquiries/:id/read", protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    
    inquiry.isRead = true;
    await inquiry.save();
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status." });
  }
});

// 📌 Delete inquiry (Admin Only)
router.delete("/inquiries/:id", protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inquiry." });
  }
});

export default router;
