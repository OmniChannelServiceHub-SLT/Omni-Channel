const CustomerBill = require('../models/Customerbill');
const { v4: uuidv4 } = require('uuid');

exports.createCustomerBill = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id || `CB-${uuidv4().split('-')[0]}`;
    body.id = id;
    body.href = body.href || `${req.protocol}://${req.get('host')}/tmf/customerBill/${id}`;

    const bill = new CustomerBill(body);
    await bill.save();

    res.status(201).json(bill);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

exports.getCustomerBill = async (req, res) => {
  try {
    const bill = await CustomerBill.findOne({ id: req.params.id });
    if (!bill) return res.status(404).json({ message: 'Not found' });
    res.json(bill);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createCustomerBillOnDemand = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id || `D-${uuidv4().split('-')[0]}`;
    body.id = id;
    body.lastUpdate = body.lastUpdate || new Date().toISOString();

    const billOnDemand = new CustomerBill(body);
    await billOnDemand.save();

    res.status(201).json(billOnDemand);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
