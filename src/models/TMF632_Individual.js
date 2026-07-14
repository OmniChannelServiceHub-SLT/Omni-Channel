const mongoose = require("mongoose");

const IndividualSchema = new mongoose.Schema(
  {
    // ---- TMF632: Individual ----
    individual: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      contactMedium: [
        {
          type: {
            type: String, // email | mobile
            required: true
          },
          value: {
            type: String,
            required: true
          }
        }
      ]
    },

    // ---- TMF672: UserAccount ----
    username: {
      type: String,
      required: true,
      unique: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED"],
      default: "PENDING"
    },

    // OTP-related (platform-level)
    otp: {
      code: String,
      expiresAt: Date
    },

    // Refresh token (platform-level)
    refreshToken: {
      type: String,
      select: false
    },

    "@type": { type: String, default: "Individual" },
    "@baseType": String
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.TMF632_Individual ||
  mongoose.model("TMF632_Individual", IndividualSchema);