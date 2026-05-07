const DraftData = require('../../../models/TMF699_NewConDraftData');

class UpdateDraftDataV2Service {
    static async updateDraft(body) {
        const draft = await DraftData.findOne({ NIC: body.NIC, SERVICE_TYPE: 'FTTH' });
        if (!draft) {
            throw new Error('No draft found for this NIC');
        }
        Object.assign(draft, { ...body, updatedAt: new Date() });
        await draft.save();
        return draft;
    }
}

module.exports = UpdateDraftDataV2Service;