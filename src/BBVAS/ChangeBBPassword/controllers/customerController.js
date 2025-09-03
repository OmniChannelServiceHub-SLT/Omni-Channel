// src/BBVAS/ChangeBBPassword/controllers/customerController.js
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB || "customerDB";

if (!uri) {
  throw new Error("MONGO_URI not set in .env");
}

exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const client = new MongoClient(uri, {
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });

    await client.connect();
    const db = client.db(dbName);
    const customers = db.collection("customers");

    const customer = await customers.findOne({ email });
    if (!customer) {
      await client.close();
      return res.status(404).json({ message: "Customer not found" });
    }

    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, customer.password);
      if (!isMatch) {
        await client.close();
        return res.status(401).json({ message: "Old password is incorrect" });
      }
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await customers.updateOne({ email }, { $set: { password: hashedPassword } });

    await client.close();
    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
