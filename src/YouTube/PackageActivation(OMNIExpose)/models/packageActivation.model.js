// ============================================================
//  models/packageActivation.model.js
//
//  TMF638 – Service Inventory Management
//  Builds the Service response object for Package Activation.
//
//  Key TMF638 fields:
//    id                    – unique activation reference (uuid)
//    state                 – service lifecycle: inactive → active
//    serviceCharacteristic – carries telephoneNo and packageId
//    serviceSpecification  – links back to TMF620 product catalog
// ============================================================

const { v4: uuidv4 } = require('uuid');

/**
 * buildTMF638ServiceResponse
 *
 * @param {string} telephoneNo  – subscriber's telephone number
 * @param {string} packageId    – package/product identifier
 * @param {string} state        – 'active' | 'inactive' | 'terminated'
 * @param {object} extra        – any extra fields to merge in
 */
const buildTMF638ServiceResponse = (telephoneNo, packageId, state = 'active', extra = {}) => {
  const now = new Date().toISOString();

  return {
    // ── TMF638 Core ──────────────────────────────────────────
    id: uuidv4(),
    href: `/tmf-api/serviceInventory/v5/service/${uuidv4()}`,
    '@type': 'Service',
    '@baseType': 'Service',
    '@schemaLocation': 'https://tmforum.org/schemas/TMF638/Service.schema.json',

    // ── Identity ─────────────────────────────────────────────
    name: `PackageActivation-${packageId}`,
    description: `OMNI package activation for telephone ${telephoneNo}`,
    serviceType: 'PackageActivation',

    // ── Lifecycle State ──────────────────────────────────────
    state,
    startDate: now,
    hasStarted: state === 'active',

    // ── Service Characteristics ──────────────────────────────
    serviceCharacteristic: [
      { id: uuidv4(), name: 'telephoneNo', valueType: 'string', value: telephoneNo },
      { id: uuidv4(), name: 'packageId',  valueType: 'string', value: packageId  },
    ],

    // ── Related Party ─────────────────────────────────────────
    relatedParty: [
      {
        '@type': 'RelatedPartyRefOrPartyRoleRef',
        '@referredType': 'Organization',
        role: 'Provider',
        name: 'SLT',
      },
    ],

    // ── Product Offering Reference (TMF620) ──────────────────
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
