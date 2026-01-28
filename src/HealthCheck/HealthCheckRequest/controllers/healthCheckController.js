
exports.getHealthCheckStatus = async (req, res) => {
    try {
        const telephoneNo = req.query.telephoneNo;
        const accountNo = req.query.accountNo;

        if (!telephoneNo || !accountNo) {
            return res.status(400).json({
                status: "error",
                message: "telephoneNo and accountNo are required"
            });
        }

        // Mock response as per requirement
        console.log(`HealthCheckRequest received: Tel=${telephoneNo}, Acc=${accountNo}`);
        console.log("HealthCheckRequest controller executing");

        res.status(200).json({
            status: "success",
            message: "System is healthy",
            data: {
                telephoneNo,
                accountNo,
                systemStatus: "Operational",
                lastCheck: new Date().toISOString()
            }
        });

    } catch (err) {
        console.error("Error in getHealthCheckStatus:", err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message
        });
    }
};
