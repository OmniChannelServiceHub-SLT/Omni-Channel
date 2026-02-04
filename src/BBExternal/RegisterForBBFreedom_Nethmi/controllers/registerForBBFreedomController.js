
const { successResponse, errorResponse, badRequestResponse } = require('../utils/responseHandler');

exports.registerForBBFreedom = async (req, res) => {
    try {
        const contentType = req.headers['content-type'];
        console.log('Content-Type:', contentType);
        console.log('Incoming Body:', JSON.stringify(req.body, null, 2));

        // DETECT POSTMAN CONFIGURATION ERROR
        // If content-type is urlencoded but body looks like JSON keys (typical Postman error)
        if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
            const bodyKeys = Object.keys(req.body);
            if (bodyKeys.length > 0 && bodyKeys[0].trim().startsWith('{')) {
                return badRequestResponse(res, "CONFIGURATION ERROR: You are sending JSON data but the Content-Type header is set to 'application/x-www-form-urlencoded'. Please go to the 'Headers' tab in Postman and remove the manual Content-Type header, or set it to 'application/json'.");
            }
        }

        // Strict check for Content-Type
        if (!contentType || !contentType.includes('application/json')) {
            console.warn('Warning: Content-Type is not application/json. Postman might be misconfigured.');
        }

        const tpNo = req.body.tpNo;
        const description = req.body.description;
        const contactMobile = req.body.contactMobile;

        if (!tpNo) {
            return badRequestResponse(res, "tpNo is required");
        }

        console.log(`RegisterForBBFreedom request received: TP=${tpNo}, Desc=${description}, Contact=${contactMobile}`);

        // Construct standard success response structure matching the previous one but wrapped in the utility
        const responseData = {
            status: "success",
            message: "Successfully registered for BB Freedom",
            data: {
                tpNo,
                description,
                contactMobile
            }
        };

        // Note: The reference code returns `result` directly.
        // If we want to strictly match the "proper display" mentioned by user which might be the *utility's* format:
        // successResponse(res, data) -> res.json(data).
        // My previous code returned { status, message, data }.
        // The reference `ServiceOrderController.js` does `return successResponse(res, result, 201);`
        // So I should pass my object as the `data` argument.

        return successResponse(res, responseData);

    } catch (err) {
        console.error("Error in registerForBBFreedom:", err);
        return errorResponse(res, err.message, 500);
    }
};
