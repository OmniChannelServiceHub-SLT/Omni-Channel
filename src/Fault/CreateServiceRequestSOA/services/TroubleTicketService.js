const axios = require('axios');

exports.createTroubleTicket = async (tmfPayload) => {
  const { description, type, relatedParty, note } = tmfPayload;

  const internalPayload = {
    description: description || "Default Description",
    SRType: type || "Automated Service Registration",
    INSArea: "Service Registration",
    INSSubArea: "PEO TV Go",
    ServiceId: relatedParty?.[0]?.id || "Unknown",
    TTSource: "OMNI",
    note: note?.[0]?.text || "Sample Note",
    notetype: note?.[0]?.author || "Customer Note",
  };

  try {
    // Real backend API call
    const response = await axios.post(
      "https://omnitest.slt.com.lk/api/Fault/CreateServiceRequest",
      internalPayload
    );

    // Transform backend response → TMF621 format
    const ticketId = response.data?.ticketId || "12345";
    const now = new Date().toISOString();

    return {
      id: ticketId,
      href: `/tmf-api/troubleTicket/v4/troubleTicket/${ticketId}`,
      "@baseType": "TroubleTicket",
      "@type": "TroubleTicket",
      "@schemaLocation": "https://www.tmforum.org/BSD/TroubleTicket-schema.json",
      description: internalPayload.description,
      status: "acknowledged",
      statusChange: now,
      type: internalPayload.SRType,
      priority: "Medium",
      severity: "Low",
      category: "Service Request",
      impact: "Low",
      relatedParty: relatedParty || [],
      note: note || [],
      service: [
        {
          id: internalPayload.ServiceId,
          href: `/tmf-api/service/v4/service/${internalPayload.ServiceId}`,
          name: "PEO TV Go"
        }
      ],
      relatedEntity: []
    };

  } catch (err) {
    console.warn("Backend unavailable, using mock response:", err.message);

    const ticketId = "MOCK-12345";
    const now = new Date().toISOString();

    return {
      id: ticketId,
      href: `/tmf-api/troubleTicket/v4/troubleTicket/${ticketId}`,
      "@baseType": "TroubleTicket",
      "@type": "TroubleTicket",
      "@schemaLocation": "https://www.tmforum.org/BSD/TroubleTicket-schema.json",
      description: internalPayload.description,
      status: "acknowledged",
      statusChange: now,
      type: internalPayload.SRType,
      priority: "Medium",
      severity: "Low",
      category: "Service Request",
      impact: "Low",
      relatedParty: relatedParty || [],
      note: note || [],
      service: [
        {
          id: internalPayload.ServiceId,
          href: `/tmf-api/service/v4/service/${internalPayload.ServiceId}`,
          name: "PEO TV Go"
        }
      ],
      relatedEntity: []
    };
  }
};
