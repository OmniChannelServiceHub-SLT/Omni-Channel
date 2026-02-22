/**
 * TMF622 Product Order – service layer
 * Fetches product order from DB collection "productorders" only; no hardcoded details.
 */
const ProductOrder = require("../models/ProductOrder.model");

const PRODUCT_ORDER_BASE_PATH = "/tmf-api/productOrderManagement/v4/productOrder";

/**
 * Build TMF622 ProductOrder response from DB document.
 * All fields from the DB document are included; id, href and @type are set for TMF.
 */
function toTMFProductOrder(doc) {
  if (!doc) return null;
  const id = doc._id ? doc._id.toString() : doc.id;
  const { _id, __v, ...rest } = doc;
  return {
    id,
    href: `${PRODUCT_ORDER_BASE_PATH}/${id}`,
    "@type": "ProductOrder",
    ...rest,
    orderDate: doc.orderDate || doc.creationDate || rest.orderDate
  };
}

/**
 * Retrieve product order by id (TMF622 GET productOrder/{id}).
 * Tries: _id (ObjectId or string), externalId (string), externalId.id (array of ExternalIdentifier), then externalReference.value.
 */
async function retrieveById(id) {
  if (!id) return null;

  let doc = await ProductOrder.findById(id).lean();

  if (!doc) {
    doc = await ProductOrder.findOne({ externalId: id }).lean();
  }

  if (!doc) {
    doc = await ProductOrder.findOne({ "externalId.id": id }).lean();
  }

  if (!doc) {
    doc = await ProductOrder.findOne({
      "externalReference.value": id
    }).lean();
  }

  return toTMFProductOrder(doc);
}

/**
 * List product orders filtered by customer NIC (TMF622 GET /productOrder with filter).
 * Matches documents where NIC is stored in: nic, customerNic, relatedParty.partyOrPartyRole.id,
 * relatedParty.identification, or relatedParty.characteristic (name "nic").
 */
async function listByNic(nic) {
  if (!nic || typeof nic !== "string" || !nic.trim()) {
    return [];
  }
  const value = nic.trim();
  const query = {
    $or: [
      { nic: value },
      { customerNic: value },
      { requestorNic: value },
      { "relatedParty.partyOrPartyRole.id": value },
      { "relatedParty.identification": value },
      { "relatedParty.id": value },
      { "relatedParty.characteristic.value": value },
      { "relatedParty.characteristic": { $elemMatch: { name: /nic/i, value } } }
    ]
  };
  const docs = await ProductOrder.find(query).lean();
  return docs.map(toTMFProductOrder).filter(Boolean);
}

module.exports = {
  retrieveById,
  listByNic,
  toTMFProductOrder
};
