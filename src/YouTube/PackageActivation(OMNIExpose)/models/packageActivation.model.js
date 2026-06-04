const { v4: uuidv4 } = require('uuid');
const buildTMF638ServiceResponse = (telephoneNo, packageId, state = 'active', extra = {}) => {
  const now = new Date().toISOString();

  return {
   
    id: uuidv4(),
    href: `/tmf-api/serviceInventory/v5/service/${uuidv4()}`,
    '@type': 'Service',
    '@baseType': 'Service',
    '@schemaLocation': 'https://tmforum.org/schemas/TMF638/Service.schema.json',

   
    name: `PackageActivation-${packageId}`,
    description: `OMNI package activation for telephone ${telephoneNo}`,
    serviceType: 'PackageActivation',
    state,
    startDate: now,
    hasStarted: state === 'active',

    serviceCharacteristic: [
      { id: uuidv4(), name: 'telephoneNo', valueType: 'string', value: telephoneNo },
      { id: uuidv4(), name: 'packageId',  valueType: 'string', value: packageId  },
    ],

    relatedParty: [
      {
        '@type': 'RelatedPartyRefOrPartyRoleRef',
        '@referredType': 'Organization',
        role: 'Provider',
        name: 'SLT',
      },
    ],

    serviceSpecification: {
      '@type': 'ServiceSpecificationRef',
      id: packageId,
      href: `/tmf-api/productCatalog/v5/productOffering/${packageId}`,
      name: `Package-${packageId}`,
      version: '1.0',
    },

    ...extra,
  };
};

module.exports = { buildTMF638ServiceResponse };
