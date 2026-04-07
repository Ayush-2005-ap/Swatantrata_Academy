import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iconName: {
    type: String,
    default: 'BookOpen' // Lucide icon name mapping
  },
  color: {
    type: String,
    default: 'from-blue-500 to-cyan-500' // Tailwind gradient classes
  },
  duration: {
    type: String,
    default: 'TBD'
  },
  location: {
    type: String,
    default: 'Various Locations'
  },
  features: {
    type: [String], // Array of strings like ['Stipend', 'Mentorship']
    default: []
  },
  logo: {
    type: String,
    default: '' // Cloudinary URL for the logo
  },
  isMainProgram: {
    type: Boolean,
    default: false // Whether the program is showcased on the landing page
  }
}, { timestamps: true });

export default mongoose.model('Program', ProgramSchema);
