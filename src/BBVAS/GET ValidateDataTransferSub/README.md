# Data Transfer Validation API

## Overview

This module implements the **GET ValidateDataTransferSub** request following **TM Forum Open API standards** (TMF640 Service Activation & Configuration API v4.0.0, TMF629 Customer API v5.0.0, TMF669 Party Role API v5.0.0).

## API Endpoints

### 1. Validate Data Transfer
**GET** `/ValidateDataTransferSub`

Validates data transfer between a subscriber and receiver using TMF640 compliant Service resources.

#### Query Parameters
- `subscriberId` (required): Subscriber ID
- `receiver` (required): Receiver ID  
- `fields` (optional): Comma-separated list of fields to return

#### Example Request
```bash
GET /ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802
```

#### Example Response
```json
{
  "id": "validate-001",
  "href": "/ValidateDataTransferSub/validate-001",
  "name": "DataTransferValidation",
  "state": "feasibilityChecked",
  "serviceCharacteristic": [
    {
      "name": "subscriberId",
      "value": "cen2431747",
      "valueType": "string"
    },
    {
      "name": "receiver",
      "value": "94382222802",
      "valueType": "string"
    }
  ],
  "relatedParty": [
    {
      "id": "cen2431747",
      "role": "Subscriber",
      "@referredType": "PartyRole"
    },
    {
      "id": "94382222802",
      "role": "Receiver",
      "@referredType": "PartyRole"
    }
  ]
}
```

### 2. Get Validation by ID
**GET** `/ValidateDataTransferSub/{id}`

Retrieves a specific validation record by ID.

#### Path Parameters
- `id`: Validation record ID

#### Query Parameters
- `fields` (optional): Comma-separated list of fields to return

#### Example Request
```bash
GET /ValidateDataTransferSub/validate-001?fields=id,href,state,serviceCharacteristic
```

### 3. List Validations
**GET** `/ValidateDataTransferSub/list`

Lists validation records with optional filtering.

#### Query Parameters
- `subscriberId` (optional): Filter by subscriber ID
- `receiver` (optional): Filter by receiver ID
- `state` (optional): Filter by state
- `isValid` (optional): Filter by validation status
- `fields` (optional): Comma-separated list of fields to return

#### Example Request
```bash
GET /ValidateDataTransferSub/list?subscriberId=cen2431747&state=feasibilityChecked
```

### 4. Health Check
**GET** `/ValidateDataTransferSub/health`

Returns service health status.

## TMF Compliance

### TMF640 Service Activation & Configuration API v4.0.0
- **Resource Model**: Services are represented as `Service` resources
- **Service Characteristics**: Query parameters map to `serviceCharacteristic`
- **Service States**: Uses states like `feasibilityChecked`, `active`, `inactive`, `terminated`

### TMF629 Customer API v5.0.0 & TMF669 Party Role API v5.0.0
- **Related Parties**: Maps `subscriberId` and `receiver` to `relatedParty` with roles
- **Party Roles**: Uses `Subscriber` and `Receiver` roles with `@referredType: "PartyRole"`

## Headers

The API supports standard TMF API headers:
- `Authorization: Bearer <token>` (OAuth2/JWT)
- `Accept: application/json`
- `Content-Type: application/json`

## Error Handling

Follows TMF error model:

```json
{
  "code": "400",
  "reason": "Missing subscriberId",
  "message": "subscriberId is required for validation",
  "@type": "Error",
  "@baseType": "Error"
}
```

## Database Schema

### DataTransferValidation Model
```javascript
{
  id: String,                    // Unique validation ID
  href: String,                  // Resource href
  name: String,                   // Service name
  state: String,                  // Service state
  serviceCharacteristic: Array,   // TMF640 characteristics
  relatedParty: Array,           // TMF629/TMF669 parties
  serviceSpecification: Object,   // Service specification
  validFor: Object,              // Validity period
  subscriberId: String,          // Backward compatibility
  receiverId: String,            // Backward compatibility
  validationDate: Date,          // Validation timestamp
  isValid: Boolean,              // Validation result
  '@type': String,               // TMF type
  '@baseType': String,           // TMF base type
  '@schemaLocation': String      // TMF schema location
}
```

## Testing

### Seed Data
Use the seed file to populate test data:

```javascript
const { seedDataTransferValidations } = require('./dataTransferValidationSeed');
await seedDataTransferValidations();
```

### Test Cases
1. **Valid Request**: `GET /ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802`
2. **Missing subscriberId**: Should return 400 error
3. **Missing receiver**: Should return 400 error
4. **Field Selection**: `GET /ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802&fields=id,href,state`

## Implementation Notes

- **MongoDB Integration**: Uses Mongoose for data persistence
- **TMF Compliance**: Strict adherence to TMF640, TMF629, and TMF669 standards
- **Backward Compatibility**: Maintains compatibility with existing systems
- **Production Ready**: Includes proper error handling, logging, and validation
- **Mobile Friendly**: Responsive API design for any client consumption

## File Structure

```
GET ValidateDataTransferSub/
├── models/
│   └── DataTransferValidationModel.js
├── services/
│   └── dataTransferValidationService.js
├── controllers/
│   └── dataTransferValidationController.js
├── routes/
│   └── dataTransferValidationRoutes.js
├── dataTransferValidationSeed.js
└── README.md
```
