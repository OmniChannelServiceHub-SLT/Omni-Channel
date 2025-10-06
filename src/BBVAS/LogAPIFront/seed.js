// src/BBVAS/LogAPIFront/seed.js

const path = require("path");
const dotenv = require("dotenv");

// Force dotenv to always load from project root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const mongoose = require("mongoose");
const Product = require("./models/ProductModel");
const connectDB = require("../../config/db");

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
} else {
  console.log("📡 Using Mongo URI:", process.env.MONGO_URI.replace(/\/\/.*@/, "//***:***@"));
}

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("🧹 Cleared existing Product collection");

    const product = new Product({
      id: "p12345",
      name: "Home Broadband 100Mbps",
      description: "Broadband Base Package with Extra GB",
      isBundle: true,
      isCustomerVisible: true,
      creationDate: new Date(),
      status: "active",
      productSpecification: {
        id: "7",
        href: "https://api.mycompany.com/productCatalogManagement/v5/productSpecification/7",
        version: "1",
        "@type": "ProductSpecificationRef",
        "@referredType": "ProductSpecification"
      },
      relatedParty: [
        {
          role: "User",
          partyOrPartyRole: {
            id: "94112421536",
            href: "https://api.mycompany.com/partyManagement/v5/individual/94112421536",
            name: "Customer 94112421536",
            "@type": "PartyRef",
            "@referredType": "Individual"
          },
          "@type": "RelatedPartyOrPartyRole"
        }
      ],
      productRelationship: [
        {
          relationshipType: "add-on",
          product: {
            id: "EXTRA_GB_20",
            name: "Extra 20GB Pack",
            status: "active",
            productCharacteristic: [
              {
                id: "Char1",
                name: "Volume",
                valueType: "number",
                value: 20,
                unitOfMeasure: "GB",
                "@type": "NumberCharacteristic"
              },
              {
                id: "Char2",
                name: "Expiry",
                valueType: "dateTime",
                value: "2025-10-30T23:59:59Z",
                "@type": "DateTimeCharacteristic"
              }
            ],
            "@type": "Product"
          }
        }
      ]
    });

    await product.save();
    console.log("✅ Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting seed data:", error);
    process.exit(1);
  }
};

seedData();
