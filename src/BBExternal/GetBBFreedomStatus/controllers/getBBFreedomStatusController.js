// TMF637 - Product Inventory Management v4 - GetBBFreedomStatus
exports.getBBFreedomStatus = async (req, res) => {
    try {
        const tpNo = req.query.tpNo;

        if (!tpNo) {
            return res.status(400).json({
                "@type": "Error",
                code: "ERR_MISSING_PARAMS",
                reason: "tpNo is required"
            });
        }

        console.log(`GetBBFreedomStatus request received: TP=${tpNo}`);

        res.status(200).json({
            "@type": "Product",
            "@schemaLocation": "/tmf-api/productInventory/v4/schema/product",
            id: `bbfreedom-${tpNo}`,
            href: `/tmf-api/productInventory/v4/product/bbFreedomStatus?tpNo=${encodeURIComponent(tpNo)}`,
            name: "BB Freedom",
            status: "Active",
            startDate: "2026-01-15",
            terminationDate: "2027-01-15",
            productCharacteristic: [
                { name: "tpNo", value: tpNo },
                { name: "freedomStatus", value: "Active" }
            ],
            relatedParty: [
                {
                    "@type": "RelatedParty",
                    id: tpNo,
                    role: "subscriber"
                }
            ]
        });

    } catch (err) {
        console.error("Error in getBBFreedomStatus:", err);
        res.status(500).json({
            "@type": "Error",
            code: "ERR_INTERNAL",
            reason: "Internal Server Error",
            message: err.message
        });
    }
};
