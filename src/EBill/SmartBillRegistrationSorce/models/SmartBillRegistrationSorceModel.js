const mongoose = require("mongoose");

/**
 * TMF678-aligned BillPresentationProfile (e-bill registration)
 * - Represents how a customer wants to receive their bill (email/SMS/portal etc.)
 */
const BillPresentationProfileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },      // TMF common id
    href: { type: String },                    // TMF common href

    // The billing account this profile applies to
    account: {
      id: { type: String, required: true },    // accountNumber
      href: { type: String }                   // optional link to customerAccount resource
    },

    // Where/how to deliver the bill
    presentationMedia: {
      // e.g. 1=email, 2=sms, 3=portal/app (mapped from sourceTypeId)
      typeId: { type: Number, required: true },
      // mapped from billHandingCode (e.g. 24)
      handingCode: { type: String },
      // contact target (email/phone). You passed "billingContact" in Postman.
      contact: { type: String, required: true }
    },

    // Optional original source of event (from "eventSource" param)
    eventSource: { type: String },

    // Flags from your Postman body
    isCustomerConfirmed: { type: Boolean, default: false },
    isPrestigeCustomer: { type: Boolean, default: false },

    // Status of registration
    state: {
      type: String,
      enum: ["active", "pending", "rejected", "inactive"],
      default: "active"
    },

    // Related party – capture TP no as a party id if you have it
    relatedParty: [
      {
        role: { type: String, default: "Customer" },
        id: { type: String },                   // e.g. tpNo
        href: { type: String }
      }
    ],

    // Validity (optional)
    validFor: {
      startDateTime: { type: Date },
      endDateTime: { type: Date }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillPresentationProfile", BillPresentationProfileSchema);
