const mongoose = require('mongoose');

// TMF 681 Communication Management API v4.0.0
const CharacteristicSchema = new mongoose.Schema({
  '@type': String,
  name: String,
  value: String,
  valueType: String
}, { _id: false });

const AttachmentSchema = new mongoose.Schema({
  '@type': String,
  url: String,
  name: String,
  content: String,
  attachmentType: String,
  mimeType: String
}, { _id: false });

const PartyOrPartyRoleSchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String,
  '@type': String
}, { _id: false });

const RelatedPartyOrPartyRoleSchema = new mongoose.Schema({
  role: String,
  partyOrPartyRole: PartyOrPartyRoleSchema,
  '@type': String
}, { _id: false });

const SenderSchema = new mongoose.Schema({
  '@type': String,
  id: String,
  name: String,
  phoneNumber: String,
  party: RelatedPartyOrPartyRoleSchema
}, { _id: false });

const ReceiverSchema = new mongoose.Schema({
  '@type': String,
  id: String,
  name: String,
  phoneNumber: String,
  party: RelatedPartyOrPartyRoleSchema
}, { _id: false });

const CommunicationMessageSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  href: String,
  '@type': { 
    type: String, 
    default: 'CommunicationMessage' 
  },
  subject: String,
  scheduledSendTime: Date,
  state: {
    type: String,
    enum: ['initial', 'scheduled', 'sent', 'delivered', 'failed', 'cancelled'],
    default: 'initial'
  },
  description: String,
  content: String,
  messageType: {
    type: String,
    enum: ['SMS', 'Email', 'Push', 'Banner', 'InApp'],
    default: 'Banner'
  },
  characteristic: [CharacteristicSchema],
  attachment: [AttachmentSchema],
  sender: SenderSchema,
  receiver: [ReceiverSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'communicationmessages'
});

module.exports = mongoose.model('CommunicationMessage', CommunicationMessageSchema);
