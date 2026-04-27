import express from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload, uploadToCloudinary } from '../middleware/upload.middleware.js';

const router = express.Router();

// Upload a video or image
router.post('/upload', protect, upload.single('media'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  try {
    // Upload buffer directly to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ mediaUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    // Transform into a simple key-value object for easier frontend use
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create a setting
router.post('/', protect, async (req, res) => {
  const { key, value, description } = req.body;
  try {
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description },
      { upsert: true, new: true }
    );
    res.json(setting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
