const SaveDraftDataLTEService = require('../services/SaveDraftDataLTEService');

class SaveDraftDataLTEController {
    static async saveDraftDataLTE(req, res) {
        try {
            const result = await SaveDraftDataLTEService.saveDraftLTE(req.body);
            res.status(201).json({
                status: 'success',
                message: 'LTE Draft data saved successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                code: '500',
                reason: 'Internal Server Error',
                message: error.message,
                status: '500'
            });
        }
    }
}

module.exports = SaveDraftDataLTEController;