const service =
require("../services/getVASDataBundlePriceService");

exports.getVASDataBundlePrice =
async (req, res) => {

    try {

        const { id } = req.query;

        if (!id) {

            return res.status(400).json({

                "@type": "Error",
                code: "400",
                reason: "Package id is required"

            });

        }

        const packageData =
        await service.getVASDataBundlePrice(id);

        if (!packageData) {

            return res.status(404).json({

                "@type": "Error",
                code: "404",
                reason: "Package not found"

            });

        }

        res.status(200).json({

            id: packageData.id,

            name: packageData.name,

            description: packageData.description,

            price: packageData.price,

            "@type": "ProductOffering"

        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({

            "@type": "Error",
            code: "500",
            reason: error.message

        });

    }

};