const mongoose = require('mongoose');
const Promotion = require('./src/models/Promotion');

require('dotenv').config();

async function seedPromotions() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Connected to MongoDB Atlas for seeding...');

  await Promotion.deleteMany({});
  console.log('Cleared old promotions.');

  const promotions = [
    {
      id: "LOYALTY_3GB_BONUS",
      href: "https://localhost:3000/tmf-api/promotionManagement/v4/promotion/LOYALTY_3GB_BONUS",
      description: "Loyalty promotion: Get 3GB bonus data",
      lastUpdate: new Date(),
      lifecycleStatus: "release",
      name: "Loyalty Bonus Data",
      promotionType: "Award",
      validFor: {
        startDateTime: new Date("2025-07-01T00:00:00Z"),
        endDateTime: new Date("2025-08-01T00:00:00Z")
      },
      pattern: [
        {
          id: "PATTERN_LOYALTY_3GB",
          description: "Loyalty bonus bundle for subscriber",
          action: [
            {
              id: "ACTION_BONUS_3GB",
              actionType: "3", // "3" means data (GB)
              actionValue: "3.0",
              actionEntityRef: {
                id: "BONUS_DATA_3GB",
                href: "https://localhost:3000/catalog/productOffering/BONUS_DATA_3GB",
                name: "3GB Bonus Data"
              }
            }
          ],
          criteriaGroup: [
            {
              id: "CRITERIAGROUP_LOYALTY",
              groupName: "Active Subscriber Group",
              criteriaLogicalRelationship: "AND",
              criteria: [
                {
                  id: "CRITERIA_ACTIVE_SUBSCRIBER",
                  criteriaOperator: "=",
                  criteriaParameter: "subscriberStatus",
                  criteriaValue: "active"
                }
              ]
            }
          ],
          validFor: {
            startDateTime: new Date("2025-07-01T00:00:00Z"),
            endDateTime: new Date("2025-08-01T00:00:00Z")
          }
        }
      ]
    },
    {
      id: "SUMMER_5GB_DISCOUNT",
      href: "https://localhost:3000/tmf-api/promotionManagement/v4/promotion/SUMMER_5GB_DISCOUNT",
      description: "Summer discount: Get 5GB for half price",
      lastUpdate: new Date(),
      lifecycleStatus: "release",
      name: "Summer 5GB Discount",
      promotionType: "Reduction",
      validFor: {
        startDateTime: new Date("2025-07-15T00:00:00Z"),
        endDateTime: new Date("2025-08-31T23:59:59Z")
      },
      pattern: [
        {
          id: "PATTERN_SUMMER_5GB",
          description: "Discount promotion for summer",
          action: [
            {
              id: "ACTION_DISCOUNT_5GB",
              actionType: "3",
              actionValue: "5.0",
              actionEntityRef: {
                id: "DISCOUNTED_5GB",
                href: "https://localhost:3000/catalog/productOffering/DISCOUNTED_5GB",
                name: "5GB Discount Data"
              }
            }
          ],
          criteriaGroup: [
            {
              id: "CRITERIAGROUP_SUMMER",
              groupName: "Seasonal Customers",
              criteriaLogicalRelationship: "AND",
              criteria: [
                {
                  id: "CRITERIA_TOPUP",
                  criteriaOperator: ">=",
                  criteriaParameter: "topUpAmount",
                  criteriaValue: "20"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  await Promotion.insertMany(promotions);
  console.log('Inserted sample promotions successfully.');

  mongoose.connection.close();
}

seedPromotions().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
