const mongoose = require('mongoose');

const ContactMediumSchema = new mongoose.Schema({
  "@type": String,
  emailAddress: String,
  phoneNumber: String
}, { _id: false });

const RelatedPartySchema = new mongoose.Schema({
  "@type": { type: String, default: 'RelatedParty' },
  role: String,
  contactMedium: [ContactMediumSchema]
}, { _id: false });

const RelatedEntitySchema = new mongoose.Schema({
  "@type": String,
  id: String
}, { _id: false });

const CommunicationMessageSchema = new mongoose.Schema({
  "@type": { type: String, default: 'CommunicationMessage' },
  messageType: { type: String, enum: ['Push'], required: true },
  subject: String,
  category: String,
  content: String,
  status: {
    type: String,
    enum: ['Accepted', 'InProgress', 'Completed', 'Failed'],
    default: 'Accepted'
  },
  sendTime: Date,
  receiver: [RelatedPartySchema],
  relatedEntity: [RelatedEntitySchema],
  channel: {
    "@type": String,
    name: String
  }
}, {
  timestamps: true,
  collection: 'communicationMessage'
});

module.exports = mongoose.model(
  'CommunicationMessage',
  CommunicationMessageSchema
);
