// seed/seedDataGift.js
const mongoose = require("mongoose");
require("dotenv").config();
const DataGiftEnrollPrepaidConfirm = require("../models/DataGiftEnrollPrepaidConfirm");

const seedData = [
  {
    serviceId: "SVC1001",
    confirmationCode: "CONFIRM001",
    relatedParty: [{ id: "CUST100", role: "customer", referredType: "Individual" }],
    validFor: {
      startDateTime: new Date("2025-09-22T08:00:00Z"),
      endDateTime: new Date("2025-09-23T08:00:00Z")
    },
    status: "confirmed"
  },
  {
    serviceId: "SVC1002",
    confirmationCode: "CONFIRM002",
    relatedParty: [{ id: "CUST200", role: "customer", referredType: "Individual" }],
    validFor: {
      startDateTime: new Date("2025-09-22T10:00:00Z"),
      endDateTime: new Date("2025-09-23T10:00:00Z")
    },
    status: "pending"
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    await DataGiftEnrollPrepaidConfirm.deleteMany({});
    console.log("Old data removed");

    await DataGiftEnrollPrepaidConfirm.insertMany(seedData);
    console.log("Seed data inserted");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDB();
