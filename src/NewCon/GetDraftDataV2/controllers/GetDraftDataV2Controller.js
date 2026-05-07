const GetDraftDataV2Service = require('../services/GetDraftDataV2Service');

class GetDraftDataV2Controller {
    static async getDraftDataV2(req, res) {
        try {
            const { NIC } = req.query;
            if (!NIC) {
                return res.status(400).json({
                    code: '400',
                    reason: 'Bad Request',
                    message: 'NIC query parameter is required',
                    status: '400'
                });
            }
            const result = await GetDraftDataV2Service.getDraftByNIC(NIC);
            res.status(200).json({
                status: 'success',
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

module.exports = GetDraftDataV2Controller;