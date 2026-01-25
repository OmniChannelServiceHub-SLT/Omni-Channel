// seedProductOfferings.js
const mongoose = require("mongoose");
const ProductOffering = require("./productOffering.model"); // adjust path if needed

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb+srv://omnichannelservicehub_db_user:OmniChannel@cluster0.jgutgzr.mongodb.net/OmniChannel?retryWrites=true&w=majority";

const seedData = [
  {
    _id: "BB_SLT_4G_ANYTIDE",
    name: "Any Tide",
    offeringType: "SLT 4G",
    lifecycleStatus: "Active",
    description: "Unlimited 4G broadband package for SLT customers",
    productSpecification: {
      id: "PS_SLT_4G_ANYTIDE",
      accessType: "4G",
      downloadSpeed: "100Mbps",
      uploadSpeed: "50Mbps"
    },
    productOfferingPrice: [
      {
        priceType: "recurring",
        price: { amount: 49.99, unit: "USD" }
      },
      {
        priceType: "oneTime",
        price: { amount: 9.99, unit: "USD" }
      }
    ]
  },
  {
    _id: "BB_FIBER_1TB",
    name: "Fiber Max 1TB",
    offeringType: "Fiber",
    lifecycleStatus: "Active",
    description: "High-speed fiber broadband with 1TB data limit",
    productSpecification: {
      id: "PS_FIBER_1TB",
      accessType: "Fiber",
      downloadSpeed: "500Mbps",
      uploadSpeed: "250Mbps"
    },
    productOfferingPrice: [
      {
        priceType: "recurring",
        price: { amount: 79.99, unit: "USD" }
      },
      {
        priceType: "oneTime",
        price: { amount: 19.99, unit: "USD" }
      }
    ]
  },
  {
    _id: "BB_FIBER_UNLIMITED",
    name: "Fiber Unlimited",
    offeringType: "Fiber",
    lifecycleStatus: "Active",
    description: "Unlimited fiber broadband for heavy users",
    productSpecification: {
      id: "PS_FIBER_UNLIMITED",
      accessType: "Fiber",
      downloadSpeed: "1Gbps",
      uploadSpeed: "500Mbps"
    },
    productOfferingPrice: [
      {
        priceType: "recurring",
        price: { amount: 99.99, unit: "USD" }
      }
    ]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected.");

    // Clear existing data
    await ProductOffering.deleteMany({});
    console.log("Existing ProductOfferings removed.");

    // Insert seed data
    await ProductOffering.insertMany(seedData);
    console.log("Seed data inserted successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDB();
