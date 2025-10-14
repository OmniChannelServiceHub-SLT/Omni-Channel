const axios = require("axios");

const USE_MOCK = true; // Toggle to false when connecting to real SLT API

/**
 * Fetch Service Status for an account and TP number
 */
const fetchServiceStatus = async (accountNo, tpNo) => {
  if (USE_MOCK) {
    // Return mock data
    const mockService = {
      id: "srv-001",
      name: "SMS Service",
      category: "Communication",
      type: "VAS",
      serviceState: "active",
      serviceSpecification: { id: "spec-001", name: "SMS Notification Service" },
      relatedParty: [{ id: "party-001", role: "subscriber", name: "John Doe" }],
      startDate: "2025-01-01T00:00:00Z",
    };

    // You can optionally match accountNo and tpNo
    if (accountNo === "0042846232" && tpNo === "0112801069") return mockService;

    return null; // or throw error if you want
  } else {
    // Call real SLT API
    try {
      const response = await axios.get(
        "https://your-slt-api.com/api/ebill/SMSServiceStatusRequest",
        {
          params: { accountNo, tpNo },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error calling SLT API:", err.message);
      throw new Error("SLT API call failed");
    }
  }
};

module.exports = { fetchServiceStatus };
