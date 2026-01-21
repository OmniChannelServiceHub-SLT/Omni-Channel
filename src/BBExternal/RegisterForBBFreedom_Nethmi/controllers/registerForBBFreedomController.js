
exports.registerForBBFreedom = async (req, res) => {
    try {
        const tpNo = req.body.tpNo || req.query.tpNo;
        const description = req.body.description || req.query.description;
        const contactMobile = req.body.contactMobile || req.query.contactMobile;

        if (!tpNo) {
            return res.status(400).json({
                status: "error",
                message: "tpNo is required"
            });
        }

        // TODO: Add database logic here if needed. 
        // For now, returning success as per standard non-DB pattern implies for this task unless specified.

        console.log(`RegisterForBBFreedom request received: TP=${tpNo}, Desc=${description}, Contact=${contactMobile}`);

        res.status(200).json({
            status: "success",
            message: "Successfully registered for BB Freedom",
            data: {
                tpNo,
                description,
                contactMobile
            }
        });

    } catch (err) {
        console.error("Error in registerForBBFreedom:", err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message
        });
    }
};
