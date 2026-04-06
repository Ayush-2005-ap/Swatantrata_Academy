import express from 'express';
import Program from '../models/Program.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a program (Admin Only)
router.post('/', protect, async (req, res) => {
  const program = new Program(req.body);
  try {
    const newProgram = await program.save();
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a program
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProgram) return res.status(404).json({ message: 'Program not found' });
    res.json(updatedProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a program
router.delete('/:id', protect, async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
