require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tmfdb";
let PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;


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

function startServer(port) {
  const server = app.listen(port);

  server.on("listening", () => {
    const address = server.address();
    if (address && typeof address === "object") {
      console.log(`Server has started.`);
      console.log(`visit - http://localhost:${address.port}`);
    }
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} is busy. Trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
}
