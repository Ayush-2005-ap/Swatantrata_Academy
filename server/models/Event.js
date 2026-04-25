import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  programId: {
    type: String,
    required: true,
    ref: 'Program'
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  isPast: {
    type: Boolean,
    default: true
  },
  about: {
    type: String, // The textual summary
    required: true
  },
  bannerImage: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
