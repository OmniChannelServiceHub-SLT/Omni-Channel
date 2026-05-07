const DraftData = require('../../../models/TMF699_NewConDraftData');

class SaveDraftDataLTEService {
    static async saveDraftLTE(body) {
        const existing = await DraftData.findOne({ NIC: body.NIC, SERVICE_TYPE: 'LTE' });
        if (existing) {
            throw new Error('LTE Draft already exists for this NIC. Use UpdateDraftDataLTE.');
        }
        const draft = new DraftData({
            ...body,
            SERVICE_TYPE: 'LTE',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await draft.save();
        return draft;
    }
}

module.exports = SaveDraftDataLTEService;