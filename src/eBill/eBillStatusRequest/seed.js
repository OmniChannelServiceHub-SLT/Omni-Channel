// seed.js
const mongoose = require("mongoose");
require("dotenv").config({ path: "../../../.env" });

// Import models
const Customer = require("./models/customerModel");
const BillingAccount = require("./models/billingAccountModel");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Customer.deleteMany({});
    await BillingAccount.deleteMany({});
    console.log("🧹 Cleared old data");

    // Insert Customer
    const customer = await Customer.create({
      id: "CUST1001",
      href: "http://localhost:3000/tmf-api/customer/CUST1001",
      status: "active",
      givenName: "John",
      familyName: "Doe",
      contactMedium: [
        {
          type: "mobile",
          characteristic: { number: "+94771234567" },
        },
        {
          type: "email",
          characteristic: { emailAddress: "john.doe@example.com" },
        },
      ],
    });

    // Insert BillingAccount
    const billingAccount = await BillingAccount.create({
      id: "BA12345",
      href: "http://localhost:3000/tmf-api/billingAccount/BA12345",
      name: "John Doe Main Account",
      accountType: "postpaid",
      state: "active",
      relatedParty: [{ id: customer.id, role: "Customer" }],
      characteristic: [{ name: "billHandlingCode", value: "2" }],
    });

    console.log("✅ Seed data created:", { customer, billingAccount });
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seed();
