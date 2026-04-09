const Customer = require("../../../models/TMF629_Customer");

// Add utility function to detect circular references
function hasCircularReference(obj, seen = new Set()) {
  if (obj && typeof obj === "object") {
    if (seen.has(obj)) return true;
    seen.add(obj);
    for (const key in obj) {
      if (hasCircularReference(obj[key], seen)) return true;
    }
    seen.delete(obj);
  }
  return false;
}

/**
 * PATCH /customer/:id
 * Update customer for eBill registration / contact preferences
 */
exports.updateCustomerForEBill = async (req, res) => {
  try {
    const customerId = req.params.id;
    const body = { ...req.body };

    console.log("Request body:", body); // Log the incoming request body

    // Check for circular references in the request body
    if (hasCircularReference(body)) {
      console.error("Circular reference detected in request body");
      return res.status(400).json({ message: "Invalid input: Circular reference detected" });
    }

    // Fetch existing customer
    const customer = await Customer.findOne({ id: customerId });
    if (!customer) {
      console.log("Customer not found for ID:", customerId); // Log if customer is not found
      return res.status(404).json({ message: "Customer not found" });
    }

    // console.log("Customer before update:", customer); // Log the fetched customer object

    // Create a plain JavaScript object to avoid direct mutation of the Mongoose document
    const updatedCustomerData = customer.toObject();

    // Ensure contactMedium exists and is an array
    updatedCustomerData.contactMedium = Array.isArray(updatedCustomerData.contactMedium)
      ? updatedCustomerData.contactMedium
      : [];

    // Update contactMedium (email & phone)
    if (Array.isArray(body.contactMedium)) {
      body.contactMedium.forEach((cm) => {
        const index = updatedCustomerData.contactMedium.findIndex(
          (c) => c.mediumType === cm.mediumType
        );
        if (index >= 0) {
          updatedCustomerData.contactMedium[index] = {
            ...updatedCustomerData.contactMedium[index],
            ...cm,
          };
        } else {
          updatedCustomerData.contactMedium.push(cm);
        }
      });
    }

    // Update other fields (e.g., account, notificationPreference)
    updatedCustomerData.account = Array.isArray(updatedCustomerData.account)
      ? updatedCustomerData.account
      : [];
    if (Array.isArray(body.account)) {
      body.account.forEach((acct) => {
        const index = updatedCustomerData.account.findIndex((a) => a.id === acct.id);
        if (index >= 0) {
          updatedCustomerData.account[index] = {
            ...updatedCustomerData.account[index],
            ...acct,
          };
        } else {
          updatedCustomerData.account.push(acct);
        }
      });
    }

    if (body.notificationPreference) {
      updatedCustomerData.notificationPreference = {
        ...updatedCustomerData.notificationPreference,
        ...body.notificationPreference,
      };
    }

    // Update last modified timestamp
    updatedCustomerData.lastUpdate = new Date();

    // console.log("Customer before save:", updatedCustomerData); // Log the customer object before saving

    // Save the updated data back to the Mongoose document
    Object.assign(customer, updatedCustomerData);
    const updatedCustomer = await customer.save();

    console.log("Updated customer:", updatedCustomer); // Log the updated customer object

    return res.status(200).json(updatedCustomer);
  } catch (e) {
    console.error("Error updating customer:", e); // Log the error
    return res.status(500).json({ message: e.message });
  }
};

/**
 * GET /customer/:id
 * Retrieve customer
 */
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ id: req.params.id });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    return res.status(200).json(customer);
  } catch (e) {
    console.error("Error fetching customer:", e);
    return res.status(500).json({ message: e.message });
  }
};