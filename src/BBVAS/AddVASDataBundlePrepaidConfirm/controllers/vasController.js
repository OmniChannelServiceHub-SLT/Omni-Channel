const vasDataBundle = require('../models/vasDataBundle');

exports.addVASDataBundlePrepaidConfirm = async (req, res) => {
  const { subscriberId, packageId, payId, pgResponseCode, date } = req.body;

  if (!subscriberId || !packageId || !payId || !pgResponseCode || !date) {
    return res.status(400).json({ error: 'Missing required request body attributes.' });
  }

  const orderState = pgResponseCode === '00' ? 'completed' : 'failed';
  const orderDate = new Date(Number(date));
  const completionDate = new Date(Number(date));


  const newOrderData = {
    externalId: [
      {
        id: payId,
        owner: "BBVAS",
        externalIdentifierType: "PAYMENT_ID",
      }
    ],
    description: `Order for subscriberId ${subscriberId} with packageId ${packageId}.`,
    orderDate: orderDate,
    completionDate: completionDate,
    state: orderState,
    relatedParty: [
      {
        id: subscriberId,
        href: `/customer-management/customer/${subscriberId}`,
        role: 'Customer',
        name: `Customer ${subscriberId}`
      }
    ],
    productOrderItem: [
      {
        id: '1',
        quantity: 1,
        product: {
          id: subscriberId,
          href: `/product-inventory/product/${subscriberId}`,
          name: 'Mobile Phone Service'
        },
        productOffering: {
          id: packageId,
          href: `/product-catalog/productOffering/${packageId}`,
          name: `Package ${packageId}`
        }
      }
    ]
  };

  try {
    const newvasDataBundle = new vasDataBundle(newOrderData);
    await newvasDataBundle.save();
    
    newvasDataBundle.id = newvasDataBundle._id;

    console.log(`New vasDataBundle created: ${newvasDataBundle.id}`);

    const responseBody = {
      id: newvasDataBundle.id,
      href: `/api/BBVAS/AddVASDataBundlePrepaidConfirm/${newvasDataBundle.id}`,
      externalId: newvasDataBundle.externalId,
      state: newvasDataBundle.state,
      orderDate: newvasDataBundle.orderDate,
      productOrderItem: newvasDataBundle.productOrderItem.map(item => ({
        id: item.id,
        productOffering: item.productOffering
      }))
    };

    res.status(201).json(responseBody);

  } catch (error) {
    console.error('Error creating VAS Data Bundle:', error);
    res.status(500).json({ error: 'Failed to create VAS Data Bundle.' });
  }
};