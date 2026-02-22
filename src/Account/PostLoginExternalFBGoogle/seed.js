require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// IMPORTANT:
// Use the safe model pattern to avoid OverwriteModelError
const User =
 //mongoose.models.User || require("../RegisterV2/models/User");

async function seed() {
  try {
    // Connect to MongoDB
    const connectionString = "mongodb+srv://omnichannelservicehub_db_user:OmniChannel@cluster0.jgutgzr.mongodb.net/OmniChannel?retryWrites=true&w=majority";
    await mongoose.connect(connectionString);
    console.log('✅ MongoDB connected');

    // Optional: clear existing users (comment out if not needed)
    await User.deleteMany({});
    console.log('🧹 Old users cleared');

    // Hash password
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // Create one user
    const user = new User({
      individual: {
        firstName: 'John',
        lastName: 'Doe',
        contactMedium: [
          {
            type: 'email',
            value: 'john.doe@example.com'
          },
          {
            type: 'mobile',
            value: '+94771234567'
          }
        ]
      },
      username: 'johndoe',
      passwordHash,
      status: 'ACTIVE',
      otp: {
        code: '123456',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
      },
      refreshToken: null,
      externalIdentities: [
        {
          provider: 'google',
          externalUserId: 'google-12345',
          email: 'john.doe@gmail.com'
        }
      ],
      deviceContext: {
        firebaseId: 'firebase-abc-123',
        appVersion: '1.0.0',
        osType: 'android',
        channelId: 'mobile-app'
      }
    });

    await user.save();

    console.log('🎉 1 User inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
