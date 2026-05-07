const DraftData = require('../../../models/TMF699_NewConDraftData');

class SaveDraftDataService {
    static async saveDraft(body) {
        const existing = await DraftData.findOne({ NIC: body.NIC, SERVICE_TYPE: 'FTTH' });
        if (existing) {
            throw new Error('Draft already exists for this NIC. Use UpdateDraftDataV2.');
        }
        const draft = new DraftData({
            ...body,
            SERVICE_TYPE: 'FTTH',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await draft.save();
        return draft;
    }
}

module.exports = SaveDraftDataService;