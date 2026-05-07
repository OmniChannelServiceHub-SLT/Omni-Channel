const UpdateDraftDataLTEService = require('../services/UpdateDraftDataLTEService');

class UpdateDraftDataLTEController {
    static async updateDraftDataLTE(req, res) {
        try {
            const result = await UpdateDraftDataLTEService.updateDraftLTE(req.query);
            res.status(200).json({
                status: 'success',
                message: 'LTE Draft data updated successfully',
                data: result
            });
        } catch (error) {
            const statusCode = error.message.includes('No LTE draft found') ? 404 : 500;
            res.status(statusCode).json({
                code: String(statusCode),
                reason: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
                message: error.message,
                status: String(statusCode)
            });
        }
    }
}

module.exports = UpdateDraftDataLTEController;