import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  key: {
    type: String, // e.g. 'HERO_VIDEO_URL', 'UPCOMING_EVENTS_VISIBLE', 'SITE_NOTIFICATION'
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  description: String
}, { timestamps: true });

export default mongoose.model('Setting', SettingSchema);
