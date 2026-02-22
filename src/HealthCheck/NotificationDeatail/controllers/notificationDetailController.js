
exports.getNotificationDetails = async (req, res) => {
    try {
        const telephoneNo = req.query.telephoneNo;
        const accountNo = req.query.accountNo;

        console.log(`NotificationDetails request received: Tel=${telephoneNo}, Acc=${accountNo}`);

        // Mock data logic
        // If params are missing, we still return a success list as per requirement "screenshot shows params but unchecked/empty"

        const notifications = [
            {
                id: "notif-001",
                type: "Maintenance",
                message: "Scheduled maintenance on 30th Jan",
                date: new Date().toISOString(),
                status: "Unread"
            },
            {
                id: "notif-002",
                type: "Billing",
                message: "Bill for Dec 2025 is ready",
                date: new Date(Date.now() - 86400000).toISOString(),
                status: "Read"
            }
        ];

        res.status(200).json({
            status: "success",
            message: "Notifications retrieved successfully",
            data: {
                telephoneNo: telephoneNo || null,
                accountNo: accountNo || null,
                count: notifications.length,
                notifications: notifications
            }
        });

    } catch (err) {
        console.error("Error in getNotificationDetails:", err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message
        });
    }
};
