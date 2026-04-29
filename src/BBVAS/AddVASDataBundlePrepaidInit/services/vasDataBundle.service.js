// src/services/vasDataBundle.service.js
const ProductOrder = require("../../../../src/models/TMF622_ProductOrder.js");
const { v4: uuidv4 } = require("uuid");

exports.createVASBundle = async (data) => {
  const id = uuidv4();

  const tmfOrder = new ProductOrder({
    id,
    href: `/productOrder/${id}`,

    description: `VAS Data Bundle - ${data.bundleName}`,
    category: "VAS",
    priority: "1",

    state: "acknowledged",

    // 🔥 FIX: add externalId mapping
    externalId: data.payId
      ? [
          {
            id: data.payId,
            owner: "BBVAS",
            externalIdentifierType: "PAYMENT_ID"
          }
        ]
      : [],

    relatedParty: [
      {
        id: data.customerId,
        role: "Customer"
      }
    ],

    productOrderItem: [
      {
        id: "1",
        action: "add",

        productOffering: {
          name: data.bundleName
        },

        product: {
          productCharacteristic: [
            {
              name: "dataVolume",
              value: data.dataVolume
            },
            {
              name: "validity",
              value: data.validity
            }
          ]
        }
      }
    ],

    orderTotalPrice: [
      {
        price: {
          taxIncludedAmount: data.price
        }
      }
    ],

    creationDate: new Date()
  });

  return await tmfOrder.save();
};

/*//src/services/vasDataBundle.service.js
const VASDataBundle = require("../models/addVASDataBundlePrepaidInit.model");

exports.createVASBundle = async (data) => {
  const vasBundle = new VASDataBundle({
    id: data.id,
    customerId: data.customerId,
    bundleName: data.bundleName,
    dataVolume: data.dataVolume,
    validity: data.validity,
    price: data.price,
    status: "initiated",
  });
  return await vasBundle.save();
};

exports.getVASBundles = async () => {
  return await VASDataBundle.find();
};
*/