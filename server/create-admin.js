import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ MONGODB_URI not found in .env file.");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB...");

    const email = "admin@swatantra.org";
    const password = "Admin@123";

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("ℹ️ Admin user already exists. No new user created.");
      process.exit(0);
    }

    const admin = new User({ email, password });
    await admin.save();

    console.log("-----------------------------------------");
    console.log("✅ SUCCESS: Admin Account Created!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("-----------------------------------------");
    console.log("Navigate to http://localhost:5173/admin/login to sign in.");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
