const Customer = require("../models/Customer");  
const bcrypt = require("bcryptjs");

exports.changeBBPassword = async (req, res) => {
  try {
    const { customerId } = req.params; // subscriberID from URL
    const { currentpass, newpass } = req.query;

    if (!currentpass || !newpass) {
      return res.status(400).json({ message: "currentpass and newpass are required" });
    }

    // find customer by subscriberID
    const customer = await Customer.findOne({ subscriberID: customerId });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(currentpass, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

    customer.password = await bcrypt.hash(newpass, 10);
    await customer.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
