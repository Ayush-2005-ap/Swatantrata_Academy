import express from 'express';
import Event from '../models/Event.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload, uploadToCloudinary } from '../middleware/upload.middleware.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get events by programId
router.get('/program/:programId', async (req, res) => {
  try {
    const events = await Event.find({ programId: req.params.programId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single event by id
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.eventId });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an event
router.post('/', protect, upload.single('banner'), async (req, res) => {
  try {
    let bannerImage = req.body.bannerImage || '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      bannerImage = result.secure_url;
      console.log('Uploaded new banner for fresh event:', bannerImage);
    }
    
    const eventData = { ...req.body, bannerImage };
    const event = new Event(eventData);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put('/:id', protect, upload.single('banner'), async (req, res) => {
  try {
    const existing = await Event.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Event not found' });

    let bannerImage = existing.bannerImage;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      bannerImage = result.secure_url;
      console.log('Upload direct success:', bannerImage);
    } else if (req.body.bannerImage !== undefined) {
      bannerImage = req.body.bannerImage;
    }

    const updateData = {
      ...req.body,
      bannerImage
    };

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
