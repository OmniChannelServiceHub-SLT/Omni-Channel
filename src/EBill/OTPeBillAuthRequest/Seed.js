// src/EBill/OTPeBillAuthRequest/Seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../../config/db");
const OTPAuth = require("./models/otpAuth.model");

// ✅ Sample seed data (enum values must match the model)
const otpSeedData = [
  {
    econtact: "0712345678",
    otpCode: "123456",
    status: "Pending",   // ✅ Must match enum ['Pending', 'Verified', 'Expired']
    createdAt: new Date()
  },
  {
    econtact: "0776543210",
    otpCode: "987654",
    status: "Verified",  // ✅ Valid enum value
    createdAt: new Date()
  }
];

const seedDatabase = async () => {
  try {
    // ✅ Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // 🧹 Clear existing records (optional but helpful for seeding)
    await OTPAuth.deleteMany();
    console.log("🧹 Existing OTP Auth records removed");

    // 🌱 Insert seed data
    await OTPAuth.insertMany(otpSeedData);
    console.log("🌱 OTP Auth seed data inserted successfully");

    // 🔌 Close connection
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error seeding OTP Auth data:", error.message);
    mongoose.connection.close();
  }
};

// 🚀 Run the seeding script
seedDatabase();
