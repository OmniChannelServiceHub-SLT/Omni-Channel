// SMSServiceStatusRequest/services/ServiceInventoryService.js
const axios = require("axios");

const USE_MOCK = true; // Toggle to false when connecting to real SLT API
const SLT_BASE_URL = process.env.SLT_BASE_URL; 

/**
 * Fetch Service Status for an account and TP number
 */
const fetchServiceStatus = async (accountNo, tpNo) => {
  if (USE_MOCK) {
    // Mock response
    const mockService = {
      id: "srv-001",
      serviceType: "VAS",
      name: "SMS Service",
      category: "Communication",
      serviceState: "active",
      serviceSpecification: {
        id: "spec-001",
        name: "SMS Notification Service"
      },
      relatedParty: [
        {
          id: "party-001",
          role: "subscriber",
          name: "John Doe"
        }
      ],
      startDate: "2025-01-01T00:00:00Z"
    };

    // Optional filtering
    if (accountNo === "0042846232" && tpNo === "0112801069") {
      return mockService;
    }

    return null;
  }

  // REAL SLT API CALL
  try {
    const response = await axios.get(`${SLT_BASE_URL}/SMSServiceStatusRequest`, {
      params: { accountNo, tpNo }
    });

    return response.data;
  } catch (err) {
    console.error("Error calling SLT API:", err.message);
    throw new Error("SLT API call failed");
  }
};

module.exports = { fetchServiceStatus };
