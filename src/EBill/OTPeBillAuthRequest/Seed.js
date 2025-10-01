require('dotenv').config();
const mongoose = require('mongoose');
const OtpAuth = require('./models/otpAuth.model');

const seedOtp = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for seeding');

    // Clear old data
    await OtpAuth.deleteMany({});
    console.log('🧹 Old OTP data cleared');

    // Insert test OTP
    const otpData = {
      econtact: 'kadlaksiha@gmail.com',
      otpCode: '9264', // same code you tested in Postman
    };

    const newOtp = await OtpAuth.create(otpData);
    console.log('🌱 Seeded OTP:', newOtp);

    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedOtp();
