/**
 * ⚠️ TMF629 - Customer Management DOMAIN MODELS
 *
 * This file contains ONLY resource models defined in TMF629 (Customer Management API).
 *
 * 📌 Guidelines:
 *
 * 1. All Customer-related models MUST be defined in this file.
 *    (e.g., Customer, Individual, Organization, etc.)
 *
 * 2. When additional TMF629 resource models are required,
 *    implement them HERE as separate Mongoose models.
 *
 * 3. Do NOT create Customer-related models in other files.
 *
 * 4. Always follow TMF629 structure:
 *    - engagedParty (Individual / Organization)
 *    - contactMedium (with mediumType & characteristic)
 *    - @type, @referredType, href, validFor, etc.
 *
 * 5. Reuse common structures where possible (ContactMedium, PartyRef, etc.)
 *
 * 6. Use:
 *    mongoose.models.ModelName || mongoose.model(...)
 *    to avoid model overwrite errors.
 *
 * 🚫 Do NOT:
 * - Duplicate models across files
 * - Store personal data directly in Customer (use engagedParty)
 *
 * ✅ Goal:
 * Maintain a single, TMF-compliant source of truth for Customer domain models.
 */

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
{
  id: { type: String, required: true, unique: true },
  href: String,

  status: String,
  statusReason: String,

  // 🔹 CRITICAL: engagedParty instead of direct name
  engagedParty: {
    id: String,
    href: String,
    name: String,
    "@referredType": String,
    "@type": String
  },

  // 🔹 Contact Medium (FIXED)
  contactMedium: [
    {
      mediumType: String, // NOT "type"
      preferred: Boolean,
      characteristic: {
        phoneNumber: String,
        emailAddress: String
      }
    }
  ],

  validFor: {
    startDateTime: Date,
    endDateTime: Date
  },

  // 🔹 TMF metadata
  "@type": { type: String, default: "Customer" },
  "@baseType": String,
  "@schemaLocation": String
},
{ strict: false }
);

module.exports = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
