const DraftData = require('../../../models/TMF699_NewConDraftData');

class GetDraftDataV2Service {
    static async getDraftByNIC(NIC) {
        const draft = await DraftData.findOne({ NIC });
        if (!draft) {
            throw new Error('No draft found for this NIC');
        }
        return draft;
    }
}

module.exports = GetDraftDataV2Service;