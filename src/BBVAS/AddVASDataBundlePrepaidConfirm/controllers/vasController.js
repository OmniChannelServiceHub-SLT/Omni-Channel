const VasDataBundle = require("../models/vasDataBundle");

exports.addVASDataBundlePrepaidConfirm = async (req, res) => {
  const { subscriberId, packageId, payId, pgResponseCode, date } = req.body;

  if (!subscriberId || !packageId || !payId || !pgResponseCode || !date) {
    return res
      .status(400)
      .json({ error: "Missing required request body attributes." });
  }

  const orderState = pgResponseCode === "00" ? "completed" : "failed";
  const orderDate = new Date(Number(date));
  const completionDate = new Date(Number(date));

  const newOrderData = {
    // Use the payId as the unique ID for the document
    id: payId,
    href: "",
    orderDate,
    completionDate,
    state: orderState,
    externalId: [
      {
        id: payId,
        owner: "BBVAS",
        externalIdentifierType: "PAYMENT_ID",
      },
    ],
    description: `Order for subscriberId ${subscriberId} with packageId ${packageId}.`,
    relatedParty: [
      {
        id: subscriberId,
        href: `/customer-management/customer/${subscriberId}`,
        role: "Customer",
        name: `Customer ${subscriberId}`,
      },
    ],
    productOrderItem: [
      {
        id: packageId,
        quantity: 1,
        product: {
          id: subscriberId,
          href: `/product-inventory/product/${subscriberId}`,
          name: "Mobile Phone Service",
        },
        productOffering: {
          id: packageId,
          href: `/product-catalog/productOffering/${packageId}`,
          name: `Package ${packageId}`,
        },
      },
    ],
  };

  try {
    const newvasDataBundle = new VasDataBundle(newOrderData);
    await newvasDataBundle.save();

    // Now that the document has a unique id, update the href
    newvasDataBundle.href = `/api/BBVAS/AddVASDataBundlePrepaidConfirm/${newvasDataBundle.id}`;
    await newvasDataBundle.save();

    console.log(`✅ New vasDataBundle created: ${newvasDataBundle.id}`);

    const responseBody = {
      id: newvasDataBundle.id,
      href: newvasDataBundle.href,
      externalId: newvasDataBundle.externalId,
      state: newvasDataBundle.state,
      orderDate: newvasDataBundle.orderDate,
      productOrderItem: newvasDataBundle.productOrderItem.map((item) => ({
        id: item.id,
        productOffering: item.productOffering,
      })),
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("❌ Error creating VAS Data Bundle:", error);
    res.status(500).json({ error: "Failed to create VAS Data Bundle." });
  }
};