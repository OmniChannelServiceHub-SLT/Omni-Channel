// 1️⃣ Load environment variables from project root
const path = require("path");

// Adjust the path exactly to your project root .env
const dotenvPath = path.join(__dirname, "..", "..", "..", ".env");
console.log("Looking for .env at:", dotenvPath);

require("dotenv").config({ path: dotenvPath });

// 2️⃣ Confirm environment variables
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
console.log("Loaded MONGO_DB:", process.env.MONGO_DB);

const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

// 3️⃣ Seed function
async function seed() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB || "customerDB";
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

  if (!uri) {
    throw new Error("❌ MONGO_URI is undefined. Check your .env file!");
  }

  const client = new MongoClient(uri, {
    ssl: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const customers = db.collection("customers");

    // Example seed data
    const seedData = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", saltRounds),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await bcrypt.hash("mypassword", saltRounds),
      },
    ];

    // Clear existing data
    await customers.deleteMany({});
    console.log("🧹 Cleared existing customers");

    // Insert seed data
    const result = await customers.insertMany(seedData);
    console.log(`✅ Inserted ${result.insertedCount} customers`);

  } catch (error) {
    console.error("❌ MongoDB error:", error);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

// 4️⃣ Run seed
seed();
