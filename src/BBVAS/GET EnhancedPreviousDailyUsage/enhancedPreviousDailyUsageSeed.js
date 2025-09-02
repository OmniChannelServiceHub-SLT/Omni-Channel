const mongoose = require('mongoose');
const EnhancedPreviousDailyUsage = require('./models/EnhancedPreviousDailyUsageModel');

/**
 * Seed data for EnhancedPreviousDailyUsage following TMF635 v4.0.0 standards
 * This provides sample data for testing and development purposes
 */

const sampleData = [
  {
    id: "93c2-683ea281566c",
    href: "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/93c2-683ea281566c",
    usageDate: new Date("2020-11-20T08:13:16.000Z"),
    usageType: "Voice",
    status: "received",
    ratedProductUsage: [
      {
        ratingDate: new Date("2020-11-20T17:00:00.000Z"),
        usageRatingTag: "Usage",
        ratingAmountType: "Total",
        taxIncludedRatingAmount: { value: 12.0, unit: "EUR" },
        taxExcludedRatingAmount: { value: 10.0, unit: "EUR" },
        taxRate: 20.0,
        isTaxExempt: false
      }
    ],
    relatedParty: [
      {
        id: "94112179676",
        href: "https://api.csp.com/tmf-api/partyManagement/v4/individual/94112179676",
        role: "customer",
        "@referredType": "Individual"
      }
    ],
    usageCharacteristic: [
      { name: "originatingNumber", value: "676123456789" },
      { name: "destinationNumber", value: "170123456789" },
      { name: "duration", value: 20 },
      { name: "unit", value: "SEC" }
    ],
    usageSpecification: {
      id: "af59-b504c742900e",
      href: "https://api.csp.com/tmf-api/usageManagement/v4/usageSpecification/af59-b504c742900e",
      name: "VoiceCall"
    },
    validFor: {
      startDateTime: new Date("2020-11-20T00:00:00.000Z"),
      endDateTime: new Date("2020-11-20T23:59:59.999Z")
    },
    billDate: new Date("2020-11-20"),
    monthIndex: 11,
    subscriberID: "94112179676",
    "@type": "EnhancedPreviousDailyUsage",
    "@baseType": "Usage",
    "@schemaLocation": "https://api.csp.com/tmf-api/usageManagement/v4/schema/EnhancedPreviousDailyUsage"
  },
  {
    id: "a1b2-c3d4e5f6g7h8",
    href: "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/a1b2-c3d4e5f6g7h8",
    usageDate: new Date("2020-11-19T14:30:00.000Z"),
    usageType: "Data",
    status: "rated",
    ratedProductUsage: [
      {
        ratingDate: new Date("2020-11-19T17:00:00.000Z"),
        usageRatingTag: "Usage",
        ratingAmountType: "Total",
        taxIncludedRatingAmount: { value: 8.0, unit: "EUR" },
        taxExcludedRatingAmount: { value: 6.67, unit: "EUR" },
        taxRate: 20.0,
        isTaxExempt: false
      }
    ],
    relatedParty: [
      {
        id: "94112179676",
        href: "https://api.csp.com/tmf-api/partyManagement/v4/individual/94112179676",
        role: "customer",
        "@referredType": "Individual"
      }
    ],
    usageCharacteristic: [
      { name: "dataVolume", value: 500 },
      { name: "unit", value: "MB" },
      { name: "serviceType", value: "4G" }
    ],
    usageSpecification: {
      id: "b2c3-d4e5f6g7h8i9",
      href: "https://api.csp.com/tmf-api/usageManagement/v4/usageSpecification/b2c3-d4e5f6g7h8i9",
      name: "DataUsage"
    },
    validFor: {
      startDateTime: new Date("2020-11-19T00:00:00.000Z"),
      endDateTime: new Date("2020-11-19T23:59:59.999Z")
    },
    billDate: new Date("2020-11-19"),
    monthIndex: 11,
    subscriberID: "94112179676",
    "@type": "EnhancedPreviousDailyUsage",
    "@baseType": "Usage",
    "@schemaLocation": "https://api.csp.com/tmf-api/usageManagement/v4/schema/EnhancedPreviousDailyUsage"
  },
  {
    id: "i9j8-k7l6m5n4o3p2",
    href: "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/i9j8-k7l6m5n4o3p2",
    usageDate: new Date("2020-11-18T09:15:00.000Z"),
    usageType: "SMS",
    status: "received",
    ratedProductUsage: [
      {
        ratingDate: new Date("2020-11-18T17:00:00.000Z"),
        usageRatingTag: "Usage",
        ratingAmountType: "Total",
        taxIncludedRatingAmount: { value: 0.12, unit: "EUR" },
        taxExcludedRatingAmount: { value: 0.10, unit: "EUR" },
        taxRate: 20.0,
        isTaxExempt: false
      }
    ],
    relatedParty: [
      {
        id: "94112179676",
        href: "https://api.csp.com/tmf-api/partyManagement/v4/individual/94112179676",
        role: "customer",
        "@referredType": "Individual"
      }
    ],
    usageCharacteristic: [
      { name: "messageType", value: "outgoing" },
      { name: "destinationNumber", value: "170123456789" },
      { name: "messageLength", value: 45 }
    ],
    usageSpecification: {
      id: "c3d4-e5f6g7h8i9j0",
      href: "https://api.csp.com/tmf-api/usageManagement/v4/usageSpecification/c3d4-e5f6g7h8i9j0",
      name: "SMSUsage"
    },
    validFor: {
      startDateTime: new Date("2020-11-18T00:00:00.000Z"),
      endDateTime: new Date("2020-11-18T23:59:59.999Z")
    },
    billDate: new Date("2020-11-18"),
    monthIndex: 11,
    subscriberID: "94112179676",
    "@type": "EnhancedPreviousDailyUsage",
    "@baseType": "Usage",
    "@schemaLocation": "https://api.csp.com/tmf-api/usageManagement/v4/schema/EnhancedPreviousDailyUsage"
  },
  {
    id: "q1w2-e3r4t5y6u7i8",
    href: "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/q1w2-e3r4t5y6u7i8",
    usageDate: new Date("2020-10-15T16:45:00.000Z"),
    usageType: "Voice",
    status: "rated",
    ratedProductUsage: [
      {
        ratingDate: new Date("2020-10-15T17:00:00.000Z"),
        usageRatingTag: "Usage",
        ratingAmountType: "Total",
        taxIncludedRatingAmount: { value: 15.0, unit: "EUR" },
        taxExcludedRatingAmount: { value: 12.5, unit: "EUR" },
        taxRate: 20.0,
        isTaxExempt: false
      }
    ],
    relatedParty: [
      {
        id: "94112179676",
        href: "https://api.csp.com/tmf-api/partyManagement/v4/individual/94112179676",
        role: "customer",
        "@referredType": "Individual"
      }
    ],
    usageCharacteristic: [
      { name: "originatingNumber", value: "676123456789" },
      { name: "destinationNumber", value: "180123456789" },
      { name: "duration", value: 45 },
      { name: "unit", value: "SEC" }
    ],
    usageSpecification: {
      id: "d4e5-f6g7h8i9j0k1",
      href: "https://api.csp.com/tmf-api/usageManagement/v4/usageSpecification/d4e5-f6g7h8i9j0k1",
      name: "VoiceCall"
    },
    validFor: {
      startDateTime: new Date("2020-10-15T00:00:00.000Z"),
      endDateTime: new Date("2020-10-15T23:59:59.999Z")
    },
    billDate: new Date("2020-10-15"),
    monthIndex: 10,
    subscriberID: "94112179676",
    "@type": "EnhancedPreviousDailyUsage",
    "@baseType": "Usage",
    "@schemaLocation": "https://api.csp.com/tmf-api/usageManagement/v4/schema/EnhancedPreviousDailyUsage"
  }
];

/**
 * Seed the database with sample data
 */
async function seedEnhancedPreviousDailyUsage() {
  try {
    // Clear existing data
    await EnhancedPreviousDailyUsage.deleteMany({});
    console.log('Cleared existing EnhancedPreviousDailyUsage data');

    // Insert sample data
    const result = await EnhancedPreviousDailyUsage.insertMany(sampleData);
    console.log(`Successfully seeded ${result.length} EnhancedPreviousDailyUsage records`);

    return result;
  } catch (error) {
    console.error('Error seeding EnhancedPreviousDailyUsage data:', error);
    throw error;
  }
}

/**
 * Get sample data for testing
 */
function getSampleData() {
  return sampleData;
}

module.exports = {
  seedEnhancedPreviousDailyUsage,
  getSampleData
};
