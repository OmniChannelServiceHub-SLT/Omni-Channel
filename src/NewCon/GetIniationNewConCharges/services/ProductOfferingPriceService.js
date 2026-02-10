class ProductOfferingPriceService {

    static async listPrices(filters) {
        return [
            {
                id: "initiation-fee-001",
                href: "/tmf-api/productCatalogManagement/v4/productOfferingPrice/initiation-fee-001",
                name: "New Connection Initiation Fee",
                description: "One-time fee for new fiber connections",

                "@type": "ProductOfferingPrice",

                priceType: "OneTime",

                price: {
                    "@type": "ProductPrice",
                    taxIncludedAmount: {
                        "@type": "Money",
                        unit: "LKR",
                        value: 1500
                    },
                    dutyFreeAmount: {
                        "@type": "Money",
                        unit: "LKR",
                        value: 1500
                    }
                },

                lifecycleStatus: "Active",
                version: "1.0",

                validFor: {
                    startDateTime: "2025-01-01T00:00:00Z"
                },

                lastUpdate: new Date().toISOString()
            }
        ];
    }

    static async getPriceById(id) {
        const prices = await this.listPrices();
        return prices.find(p => p.id === id);
    }
}

module.exports = ProductOfferingPriceService;
