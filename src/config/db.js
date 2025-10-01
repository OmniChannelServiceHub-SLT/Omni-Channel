const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/omni_channel_db';
  try {
    await mongoose.connect(uri, {
      // options no longer required in latest mongoose but harmless
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
