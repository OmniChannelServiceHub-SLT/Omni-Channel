require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tmfdb";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

mongoose
  .connect(MONGO_URI, {
    tlsAllowInvalidCertificates: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));