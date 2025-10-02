const mongoose = require('mongoose');

const MoneySchema = new mongoose.Schema({
  unit: String,
  value: Number
}, { _id: false });

const BillingAccountRefSchema = new mongoose.Schema({
  id: String,
  name: String,
  "@referredType": String,
  "@type": String
}, { _id: false });

const CustomerBillSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  href: String,
  billNo: String,
  amountDue: MoneySchema,
  taxExcludedAmount: MoneySchema,
  taxIncludedAmount: MoneySchema,
  billDate: Date,
  billingAccount: BillingAccountRefSchema,
  status: String, // new, validated, sent, settled
  runType: String,
  createdAt: { type: Date, default: Date.now },
  "@type": { type: String, default: "CustomerBill" }
});

module.exports = mongoose.model('CustomerBill', CustomerBillSchema);
