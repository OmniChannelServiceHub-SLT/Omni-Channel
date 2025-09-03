// seedCustomers.js
const { MongoClient } = require("mongodb");

async function seed() {
  const uri = "mongodb+srv://geethaanjaleeci:1234@cluster0.svprmrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // your DB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("customerDB"); // replace with your DB name
    const customers = db.collection("customers");

    // Clean existing data
    await customers.deleteMany({});

    // Insert one seed customer
    const result = await customers.insertOne({
      "@type": "Customer",
      id: "CEN2431747",  
      name: "Mary Doe",
      engagedParty: {
        "@type": "PartyRef",
        id: "502",
        href: "https://host:port/tmf-api/partyManagement/v5/organization/502",
        name: "Another Travellers",
        "@referredType": "Organization"
      },
      password: "oldPassword123"
    });

    console.log("Seeded customer:", result.insertedId);
  } finally {
    await client.close();
  }
}

seed();
