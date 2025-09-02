const DataTransferValidation = require('./models/DataTransferValidationModel');

/**
 * Seed data for Data Transfer Validation testing
 * This file provides sample data for testing the ValidateDataTransferSub API
 */

const sampleValidations = [
  {
    id: 'validate-001',
    href: '/ValidateDataTransferSub/validate-001',
    name: 'DataTransferValidation',
    description: 'Data transfer validation between subscriber cen2431747 and receiver 94382222802',
    state: 'feasibilityChecked',
    serviceCharacteristic: [
      {
        name: 'subscriberId',
        value: 'cen2431747',
        valueType: 'string',
        '@type': 'Characteristic'
      },
      {
        name: 'receiver',
        value: '94382222802',
        valueType: 'string',
        '@type': 'Characteristic'
      }
    ],
    relatedParty: [
      {
        id: 'cen2431747',
        role: 'Subscriber',
        '@referredType': 'PartyRole'
      },
      {
        id: '94382222802',
        role: 'Receiver',
        '@referredType': 'PartyRole'
      }
    ],
    serviceSpecification: {
      id: 'data-transfer-spec',
      name: 'DataTransferService',
      version: '1.0.0'
    },
    validFor: {
      startDateTime: new Date('2024-01-01T00:00:00Z'),
      endDateTime: new Date('2024-12-31T23:59:59Z')
    },
    subscriberId: 'cen2431747',
    receiverId: '94382222802',
    validationDate: new Date('2024-01-01T10:00:00Z'),
    isValid: true,
    '@type': 'Service',
    '@baseType': 'Service',
    '@schemaLocation': 'https://tmforum.org/schema/Service'
  },
  {
    id: 'validate-002',
    href: '/ValidateDataTransferSub/validate-002',
    name: 'DataTransferValidation',
    description: 'Data transfer validation between subscriber 94112179676 and receiver 94382222803',
    state: 'active',
    serviceCharacteristic: [
      {
        name: 'subscriberId',
        value: '94112179676',
        valueType: 'string',
        '@type': 'Characteristic'
      },
      {
        name: 'receiver',
        value: '94382222803',
        valueType: 'string',
        '@type': 'Characteristic'
      }
    ],
    relatedParty: [
      {
        id: '94112179676',
        role: 'Subscriber',
        '@referredType': 'PartyRole'
      },
      {
        id: '94382222803',
        role: 'Receiver',
        '@referredType': 'PartyRole'
      }
    ],
    serviceSpecification: {
      id: 'data-transfer-spec',
      name: 'DataTransferService',
      version: '1.0.0'
    },
    validFor: {
      startDateTime: new Date('2024-01-01T00:00:00Z'),
      endDateTime: new Date('2024-12-31T23:59:59Z')
    },
    subscriberId: '94112179676',
    receiverId: '94382222803',
    validationDate: new Date('2024-01-02T14:30:00Z'),
    isValid: true,
    '@type': 'Service',
    '@baseType': 'Service',
    '@schemaLocation': 'https://tmforum.org/schema/Service'
  },
  {
    id: 'validate-003',
    href: '/ValidateDataTransferSub/validate-003',
    name: 'DataTransferValidation',
    description: 'Data transfer validation between subscriber 94382222804 and receiver 94382222805',
    state: 'inactive',
    serviceCharacteristic: [
      {
        name: 'subscriberId',
        value: '94382222804',
        valueType: 'string',
        '@type': 'Characteristic'
      },
      {
        name: 'receiver',
        value: '94382222805',
        valueType: 'string',
        '@type': 'Characteristic'
      }
    ],
    relatedParty: [
      {
        id: '94382222804',
        role: 'Subscriber',
        '@referredType': 'PartyRole'
      },
      {
        id: '94382222805',
        role: 'Receiver',
        '@referredType': 'PartyRole'
      }
    ],
    serviceSpecification: {
      id: 'data-transfer-spec',
      name: 'DataTransferService',
      version: '1.0.0'
    },
    validFor: {
      startDateTime: new Date('2024-01-01T00:00:00Z'),
      endDateTime: new Date('2024-12-31T23:59:59Z')
    },
    subscriberId: '94382222804',
    receiverId: '94382222805',
    validationDate: new Date('2024-01-03T09:15:00Z'),
    isValid: false,
    '@type': 'Service',
    '@baseType': 'Service',
    '@schemaLocation': 'https://tmforum.org/schema/Service'
  }
];

/**
 * Seed the database with sample validation data
 */
async function seedDataTransferValidations() {
  try {
    console.log('Seeding Data Transfer Validation data...');
    
    // Clear existing data
    await DataTransferValidation.deleteMany({});
    console.log('Cleared existing validation data');
    
    // Insert sample data
    const result = await DataTransferValidation.insertMany(sampleValidations);
    console.log(`Inserted ${result.length} validation records`);
    
    console.log('Data Transfer Validation seeding completed successfully!');
    return result;
  } catch (error) {
    console.error('Error seeding Data Transfer Validation data:', error);
    throw error;
  }
}

/**
 * Get sample validation data for testing
 */
function getSampleValidations() {
  return sampleValidations;
}

module.exports = {
  seedDataTransferValidations,
  getSampleValidations
};
