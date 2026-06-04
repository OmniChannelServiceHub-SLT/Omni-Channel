/**
 * TMF669_PartyRole.js
 * The ONLY TMF669 (Party Role) model for the Omni-Channel project.
 *
 * Fully compliant with TMF669 Party Role Management API v5.0.0
 * Covers all PartyRole resource fields defined in the spec (page 46-57).
 *
 * Primary use case: SLT Sales Agent management
 * Also supports: Producer, Consumer, Supplier, BusinessPartner role types
 *
 * Mandatory fields per spec (for POST /partyRole):
 *   - name
 *   - engagedParty
 *   - engagedParty.@type
 *   - engagedParty.id
 *   - @type
 */

const mongoose = require('mongoose');

/* ── Sub-schemas ─────────────────────────────────────────── */

const AccountRefSchema = new mongoose.Schema({
  id:              { type: String },
  href:            { type: String },
  name:            { type: String },
  '@type':         { type: String },
  '@referredType': { type: String },
  '@baseType':     { type: String }
}, { _id: false });

const AgreementRefSchema = new mongoose.Schema({
  id:              { type: String },
  href:            { type: String },
  name:            { type: String },
  '@type':         { type: String },
  '@referredType': { type: String },
  '@baseType':     { type: String }
}, { _id: false });

const CharacteristicSchema = new mongoose.Schema({
  id:          { type: String },
  name:        { type: String },
  valueType:   { type: String },
  value:       { type: mongoose.Schema.Types.Mixed },
  '@type':     { type: String },
  '@baseType': { type: String }
}, { _id: false });

const ContactMediumSchema = new mongoose.Schema({
  id:              { type: String },
  contactType:     { type: String },   // e.g. "personal email", "work phone"
  preferred:       { type: Boolean },
  // PhoneContactMedium
  phoneNumber:     { type: String },
  // EmailContactMedium
  emailAddress:    { type: String },
  // FaxContactMedium
  faxNumber:       { type: String },
  // SocialContactMedium
  socialNetworkId: { type: String },
  // GeographicAddressContactMedium
  street1:          { type: String },
  street2:          { type: String },
  city:             { type: String },
  country:          { type: String },
  postCode:         { type: String },
  stateOrProvince:  { type: String },
  validFor: {
    startDateTime: { type: Date },
    endDateTime:   { type: Date }
  },
  '@type':     { type: String },
  '@baseType': { type: String }
}, { _id: false });

const CreditProfileSchema = new mongoose.Schema({
  id:                { type: String },
  href:              { type: String },
  creditProfileDate: { type: Date },
  creditRiskRating:  { type: Number },
  creditScore:       { type: Number },
  validFor: {
    startDateTime: { type: Date },
    endDateTime:   { type: Date }
  },
  '@type':     { type: String },
  '@baseType': { type: String }
}, { _id: false });

const PaymentMethodRefSchema = new mongoose.Schema({
  id:              { type: String },
  href:            { type: String },
  name:            { type: String },
  '@type':         { type: String },
  '@referredType': { type: String },
  '@baseType':     { type: String }
}, { _id: false });

const PartyRefSchema = new mongoose.Schema({
  id:              { type: String },
  href:            { type: String },
  name:            { type: String },
  '@type':         { type: String, default: 'PartyRef' },
  '@referredType': { type: String, default: 'Individual' },
  '@baseType':     { type: String }
}, { _id: false });

const RelatedPartySchema = new mongoose.Schema({
  role:             { type: String },  // e.g. 'manager', 'CEO', 'salesAgent'
  partyOrPartyRole: { type: PartyRefSchema },
  '@type':          { type: String, default: 'RelatedPartyOrPartyRole' },
  '@baseType':      { type: String }
}, { _id: false });

const PartyRoleSpecRefSchema = new mongoose.Schema({
  id:              { type: String },
  href:            { type: String },
  name:            { type: String },
  '@type':         { type: String, default: 'PartyRoleSpecificationRef' },
  '@referredType': { type: String },
  '@baseType':     { type: String }
}, { _id: false });

/* ── Main PartyRole Schema ───────────────────────────────── */

const PartyRoleSchema = new mongoose.Schema(
  {
    /* ── TMF669 Core Fields (spec page 46-47) ──────── */
    id:    { type: String },
    href:  { type: String },

    // MANDATORY per spec
    name:  { type: String },

    description:  { type: String },

    /* ── Role & Lifecycle Status ────────────────────── */
    role:         { type: String, default: 'SalesAgent' },
    status:       { type: String, default: 'active' },
    statusReason: { type: String },   // e.g. "Rejected: missing documents"

    /* ── TMF669 Relationship Fields ─────────────────── */
    engagedParty:           { type: PartyRefSchema },          // mandatory
    partyRoleSpecification: { type: PartyRoleSpecRefSchema },
    account:                [AccountRefSchema],
    agreement:              [AgreementRefSchema],
    characteristic:         [CharacteristicSchema],
    contactMedium:          [ContactMediumSchema],
    creditProfile:          [CreditProfileSchema],
    paymentMethod:          [PaymentMethodRefSchema],
    relatedParty:           [RelatedPartySchema],

    validFor: {
      startDateTime: { type: Date },
      endDateTime:   { type: Date }
    },

    /* ── SLT-Specific Agent Extensions ──────────────── */
    // Stored as top-level fields for query performance.
    // In strict TMF669 these would go inside the 'characteristic' array,
    // but direct fields are used for SLT's internal endpoints.
    agentCode:       { type: String, unique: true, sparse: true },
    agentName:       { type: String },
    agentEmail:      { type: String },
    agentMobile:     { type: String },
    region:          { type: String },
    district:        { type: String },

    // FTTH Security Code — used by POSTSendFTTHSecCode endpoint
    secCode:         { type: String },
    secCodeExpiry:   { type: Date },
    secCodeVerified: { type: Boolean, default: false },

    /* ── Polymorphism Fields (TMF669 §Support of polymorphism) ── */
    '@type':           { type: String, default: 'PartyRole' },
    '@baseType':       { type: String, default: 'PartyRole' },
    '@schemaLocation': { type: String }
  },
  {
    timestamps: true,   // adds createdAt, updatedAt
    versionKey: false,
    strict: false       // allows future extensions without schema changes
  }
);

// Mongoose model name: 'TMF669PartyRole'  →  MongoDB collection: 'partyroles'
module.exports = mongoose.models.TMF669PartyRole ||
  mongoose.model('TMF669PartyRole', PartyRoleSchema, 'partyroles');
