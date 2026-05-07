const DraftData = require('../../../models/TMF699_NewConDraftData');

class UpdateDraftDataLTEService {
    static async updateDraftLTE(params) {
        const draft = await DraftData.findOne({ REF_NO: params.REF_NO, SERVICE_TYPE: 'LTE' });
        if (!draft) {
            throw new Error('No LTE draft found for this REF_NO');
        }
        Object.assign(draft, { ...params, updatedAt: new Date() });
        await draft.save();
        return draft;
    }
}

module.exports = UpdateDraftDataLTEService;