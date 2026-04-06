import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['board', 'faculty'],
    default: 'board'
  },
  featured: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Member', MemberSchema);
