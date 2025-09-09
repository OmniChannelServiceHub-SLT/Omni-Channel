const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Service = require("./models/Service");
const PartyRole = require("./models/PartyRole");

mongoose.connect("mongodb://localhost:27017/tmf", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  await Customer.deleteMany({});
  await Service.deleteMany({});
  await PartyRole.deleteMany({});

  const customer = await Customer.create({
    id: "CUST1001",
    name: "Chamidu Perera",
    status: "Approved",
    engagedParty: { id: "P001", name: "Chamidu", type: "Individual" },
    contactMedium: [
      { contactType: "phone", phoneNumber: "0771234567" },
      { contactType: "email", emailAddress: "chamidu@example.com" }
    ]
  });

  const sponsorRole = await PartyRole.create({
    id: "PR2001",
    name: "Geeth Irosha",
    role: "Sponsor",
    engagedParty: { id: "P002", name: "Geeth", type: "Individual" }
  });

  const service = await Service.create({
    id: "DG5001",
    name: "DataGift 5GB",
    state: "active",
    serviceSpecification: { id: "SPEC001", name: "DataGift", type: "MobileData" },
    relatedParty: [
      { id: customer.id, name: customer.name, role: "Customer" },
      { id: sponsorRole.id, name: sponsorRole.name, role: "Sponsor" }
    ]
  });

  console.log("✅ Seeded Customer:", customer);
  console.log("✅ Seeded PartyRole:", sponsorRole);
  console.log("✅ Seeded Service:", service);

  mongoose.connection.close();
}

seed();
