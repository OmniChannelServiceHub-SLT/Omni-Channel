const SaveDraftDataService = require('../services/SaveDraftDataService');

class SaveDraftDataController {
    static async saveDraftData(req, res) {
        try {
            const result = await SaveDraftDataService.saveDraft(req.body);
            res.status(201).json({
                status: 'success',
                message: 'Draft data saved successfully',
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

module.exports = SaveDraftDataController;