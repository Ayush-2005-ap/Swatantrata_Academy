import express from 'express';
import Member from '../models/Member.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// Upload an image
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = req.file.path; // Cloudinary returns the full URL inside 'path'
  res.json({ imageUrl });
});

// Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a member (Protected)
router.post('/', protect, async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete member (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
