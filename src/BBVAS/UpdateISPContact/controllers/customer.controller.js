const Customer = require('../models/customer.model');

// PUT /api/customer/{id} to update an existing customer
exports.updateCustomer = async (req, res) => {
  const customerId = req.params.id; // Get id from params
  const { contactMedium } = req.body; // Get updated contactMedium from body

  if (!contactMedium) {
    return res.status(400).json({ error: 'Contact medium is required.' });
  }

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { id: customerId },
      { $set: { contactMedium: contactMedium } }, // Update the contactMedium array
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Server error occurred while updating customer.' });
  }
};

// You can add other controller functions here (e.g., create, get, delete)