const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");

exports.changeBBPassword = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(oldPassword, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    customer.password = hashed;
    await customer.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
