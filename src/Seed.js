const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { v4: uuidv4 } = require("uuid");
const BillPresentationProfile = require("./EBill/SmartBillRegistrationSorce/models/SmartBillRegistrationSorceModel");

dotenv.config();

(async () => {
  try {
    await connectDB();

    console.log("✅ MongoDB Connected");
    console.log("🧹 Clearing existing BillPresentationProfile records...");
    await BillPresentationProfile.deleteMany({});

    const demoProfile = {
      id: uuidv4(),
      href: "/tmf-api/customerBillManagement/v5/billPresentationProfile/demo",
      account: {
        id: "0042846232",
        href: "/tmf-api/customerManagement/v5/customerAccount/0042846232"
      },
      presentationMedia: {
        typeId: 3, // 3 = portal/app (like in your Postman)
        handingCode: "24",
        contact: "0778200186"
      },
      eventSource: "0112801069",
      isCustomerConfirmed: true,
      isPrestigeCustomer: false,
      state: "active",
      relatedParty: [
        {
          role: "Customer",
          id: "0332284864",
          href: "/tmf-api/partyManagement/v5/individual/0332284864"
        }
      ],
      validFor: {
        startDateTime: new Date(),
        endDateTime: new Date("2026-01-01T00:00:00Z")
      }
    };

    await BillPresentationProfile.create(demoProfile);
    console.log("🌱 SmartBillRegistration (BillPresentationProfile) seed inserted successfully");

    mongoose.connection.close();
    console.log("🔒 Connection closed");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    mongoose.connection.close();
  }
})();
