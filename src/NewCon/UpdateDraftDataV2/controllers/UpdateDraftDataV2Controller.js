const UpdateDraftDataV2Service = require('../services/UpdateDraftDataV2Service');

class UpdateDraftDataV2Controller {
    static async updateDraftDataV2(req, res) {
        try {
            const result = await UpdateDraftDataV2Service.updateDraft(req.body);
            res.status(200).json({
                status: 'success',
                message: 'Draft data updated successfully',
                data: result
            });
        } catch (error) {
            const statusCode = error.message.includes('No draft found') ? 404 : 500;
            res.status(statusCode).json({
                code: String(statusCode),
                reason: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
                message: error.message,
                status: String(statusCode)
            });
        }
    }
}

module.exports = UpdateDraftDataV2Controller;