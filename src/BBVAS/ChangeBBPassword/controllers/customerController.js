const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Step 1: Verify and issue token (login-like flow)
exports.requestPasswordChange = async (req, res) => {
  try {
    const { subscriberID, currentpass } = req.query;

    if (!subscriberID || !currentpass) {
      return res.status(400).json({ message: "subscriberID and currentpass are required" });
    }

    // Find customer
    const customer = await Customer.findOne({ subscriberID });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Check current password
    const isMatch = await bcrypt.compare(currentpass, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Issue short-lived token (5 min)
    const token = jwt.sign(
      { id: customer._id, subscriberID: customer.subscriberID },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.json({ message: "Verification successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Step 2: Change password (uses :id param + query params)
exports.changeBBPassword = async (req, res) => {
  try {
    const { id } = req.params; // TMF: /customer/{id}/changeBBPassword
    const { currentpass, newpass, subscriberID } = req.query;

    if (!currentpass || !newpass || !subscriberID) {
      return res.status(400).json({ message: "currentpass, newpass and subscriberID are required" });
    }

    // Find customer by ID + subscriberID
    const customer = await Customer.findOne({ id, subscriberID });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Verify old password
    const isMatch = await bcrypt.compare(currentpass, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid current password" });

    // Hash and save new password
    customer.password = await bcrypt.hash(newpass, 10);
    await customer.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
