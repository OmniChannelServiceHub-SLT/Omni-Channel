const mongoose = require('mongoose');

const TMF699_NewConDraftDataSchema = new mongoose.Schema({
    REF_NO: { type: String },
    NIC: { type: String, required: true },
    SLTNIC: { type: String },
    PP: { type: String },
    TITLE: { type: String },
    FIRSTNAME: { type: String },
    LASTNAME: { type: String },
    GENDER: { type: String },
    BIRTH_DATE: { type: String },
    NATIONALITY: { type: String },
    MOBILENO: { type: String },
    EMAIL: { type: String },
    SERVICE_TYPE: { type: String },
    SERVICE_ADD_NO: { type: String },
    SERVICE_ADD_STREET1: { type: String },
    SERVICE_ADD_STREET2: { type: String },
    SERVICE_ADD_CITY: { type: String },
    SERVICE_ADD_DISTRICT: { type: String },
    SERVICE_ADD_PROVINCE: { type: String },
    SERVICE_ADD_POSTAL_CODE: { type: String },
    BILLING_ADD_NO: { type: String },
    BILLING_ADD_STREET1: { type: String },
    BILLING_ADD_STREET2: { type: String },
    BILLING_ADD_CITY: { type: String },
    BILLING_ADD_PROVINCE: { type: String },
    BILLING_ADD_POSTAL_CODE: { type: String },
    RTOM: { type: String },
    LONGITUDE: { type: String },
    LATITUDE: { type: String },
    LOOP_AVAILABLITY: { type: String },
    BB_PACKAGE: { type: String },
    VOICE_PACKAGE: { type: String },
    PEO_PACKAGE: { type: String },
    BILLING_MODE: { type: String },
    IDDSTATUS: { type: String },
    USER_COMMENT: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'newcon_draftdata'
});

module.exports = mongoose.model('TMF699_NewConDraftData', TMF699_NewConDraftDataSchema);