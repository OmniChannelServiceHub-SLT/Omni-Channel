const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Promotion = require('./models/Promotion.js');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  const demoPromotion = new Promotion({
    externalId: 'promo-001',
    description: '1GB Bonus Data for 7 days',
    productOffering: {
      id: 'BONUS-1GB',
      name: 'Bonus Data 1GB',
    },
    productCharacteristic: [
      { name: 'validity', value: '7 days' },
      { name: 'bonusData', value: '1024MB' },
    ],
  });

  await demoPromotion.save();
  console.log('🌱 Demo promotion seeded');
  mongoose.connection.close();
}

seed();
