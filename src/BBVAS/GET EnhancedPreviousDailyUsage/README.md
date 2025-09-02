# Enhanced Previous Daily Usage API

## Overview

The Enhanced Previous Daily Usage API implements the functionality of the legacy `EnhancedPreviousDailyUsage` API using **TMF635 Usage Management API v4.0.0** standards. This API provides daily usage records for subscribers with advanced filtering capabilities while maintaining backward compatibility.

## TMF635 v4.0.0 Compliance

This implementation strictly follows the TMF635 v4.0.0 specification and user guide:

- ✅ **GET endpoints only**: Uses only the defined TMF635 GET operations
- ✅ **Standard attributes**: Implements TMF635 resource schema exactly
- ✅ **Proper filtering**: Supports TMF635 filter parameters
- ✅ **Field selection**: Implements TMF635 `fields` parameter
- ✅ **Response format**: Returns TMF635-compliant JSON responses

## API Endpoints

### 1. List Enhanced Previous Daily Usage Records

**Endpoint:** `GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage`

**Description:** Retrieves a list of enhanced previous daily usage records with TMF635 filtering.

**Query Parameters:**
- `fields` (optional): Comma-separated list of fields to return
- `relatedParty.id` (optional): Filter by subscriber ID (maps to old `subscriberID`)
- `usageDate` (optional): Filter by specific date (maps to old `billDate`)
- `validFor.startDateTime` (optional): Filter by start date/time
- `validFor.endDateTime` (optional): Filter by end date/time
- `usageType` (optional): Filter by usage type (Voice, Data, SMS, etc.)
- `status` (optional): Filter by status (received, rated, etc.)
- `monthIndex` (optional): Filter by month index (for backward compatibility)

**Example Request:**
```http
GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage?fields=id,href,status,usageType,usageDate&relatedParty.id=94112179676&usageDate=2020-11-20
```

**Example Response:**
```json
[
  {
    "id": "93c2-683ea281566c",
    "href": "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/93c2-683ea281566c",
    "status": "received",
    "usageType": "Voice",
    "usageDate": "2020-11-20T08:13:16.000Z"
  }
]
```

### 2. Get Enhanced Previous Daily Usage by ID

**Endpoint:** `GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/{id}`

**Description:** Retrieves a specific enhanced previous daily usage record by ID.

**Path Parameters:**
- `id`: Usage record ID

**Query Parameters:**
- `fields` (optional): Comma-separated list of fields to return

**Example Request:**
```http
GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/5130d5131a23?fields=id,href,ratedProductUsage,relatedParty
```

**Example Response:**
```json
{
  "id": "5130d5131a23",
  "href": "https://api.csp.com/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/5130d5131a23",
  "ratedProductUsage": [
    {
      "ratingDate": "2020-02-20T17:00:00.000Z",
      "usageRatingTag": "Usage",
      "ratingAmountType": "Total",
      "taxIncludedRatingAmount": { "value": 12.0, "unit": "EUR" },
      "taxExcludedRatingAmount": { "value": 10.0, "unit": "EUR" },
      "taxRate": 20.0,
      "isTaxExempt": false
    }
  ],
  "relatedParty": [
    {
      "id": "94112179676",
      "href": "https://api.csp.com/tmf-api/partyManagement/v4/individual/94112179676",
      "role": "customer",
      "@referredType": "Individual"
    }
  ]
}
```

### 3. Legacy Subscriber Endpoint (Backward Compatibility)

**Endpoint:** `GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber`

**Description:** Legacy endpoint that maps old API parameters to TMF635 format for backward compatibility.

**Query Parameters:**
- `subscriberID` (required): Subscriber ID
- `billDate` (optional): Bill date (maps to `usageDate`)
- `monthIndex` (optional): Month index
- `fields` (optional): Comma-separated list of fields to return

**Example Request:**
```http
GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber?subscriberID=94112179676&billDate=2020-11-20&monthIndex=11
```

### 4. Health Check

**Endpoint:** `GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/health`

**Description:** Health check endpoint for the enhanced previous daily usage service.

## Data Model

### EnhancedPreviousDailyUsage Schema

The API uses a MongoDB schema that follows TMF635 standards:

```javascript
{
  id: String,                    // Unique identifier
  href: String,                  // Resource URI
  usageDate: Date,               // Usage date (maps to old billDate)
  usageType: String,             // Type of usage (Voice, Data, SMS)
  status: String,                // Usage status
  ratedProductUsage: Array,      // Rating information
  relatedParty: Array,           // Related parties (maps to old subscriberID)
  usageCharacteristic: Array,    // Usage characteristics
  usageSpecification: Object,    // Usage specification reference
  validFor: Object,              // Validity period
  billDate: Date,                // Backward compatibility field
  monthIndex: Number,            // Backward compatibility field
  subscriberID: String,          // Backward compatibility field
  "@type": String,               // TMF635 type
  "@baseType": String,           // TMF635 base type
  "@schemaLocation": String      // TMF635 schema location
}
```

## Migration from Old API

### Parameter Mapping

| Old API Parameter | New TMF635 Parameter | Description |
|-------------------|----------------------|-------------|
| `subscriberID` | `relatedParty.id` | Subscriber identifier |
| `billDate` | `usageDate` | Date of usage/billing |
| `monthIndex` | `monthIndex` | Month index (maintained for compatibility) |

### Example Migration

**Old API Call:**
```http
GET /api/enhancedPreviousDailyUsage?subscriberID=94112179676&billDate=2020-11-20&monthIndex=11
```

**New TMF635 API Call:**
```http
GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage?relatedParty.id=94112179676&usageDate=2020-11-20&monthIndex=11
```

**Legacy Endpoint (for easy migration):**
```http
GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber?subscriberID=94112179676&billDate=2020-11-20&monthIndex=11
```

## Database Indexes

The following MongoDB indexes are created for optimal performance:

- `usageDate`: Single field index for date-based queries
- `billDate`: Single field index for backward compatibility
- `monthIndex`: Single field index for month-based queries
- `subscriberID`: Single field index for subscriber-based queries
- `{ 'relatedParty.id': 1, usageDate: 1 }`: Compound index for subscriber + date queries
- `{ subscriberID: 1, billDate: 1, monthIndex: 1 }`: Compound index for legacy queries

## Error Handling

All endpoints return TMF635-compliant error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error information",
  "@type": "Error",
  "@baseType": "Error"
}
```

## Testing

### Sample Data

The API includes a seed file (`enhancedPreviousDailyUsageSeed.js`) that provides sample data for testing:

- Voice usage records
- Data usage records
- SMS usage records
- Different dates and month indices
- Various subscriber scenarios

### Test Scenarios

1. **Basic Filtering**: Test `relatedParty.id` and `usageDate` filters
2. **Field Selection**: Test `fields` parameter with various field combinations
3. **Date Range**: Test `validFor.startDateTime` and `validFor.endDateTime`
4. **Legacy Compatibility**: Test legacy endpoint with old parameters
5. **Error Handling**: Test invalid parameters and error scenarios

## Performance Considerations

- **Indexing**: Optimized database indexes for common query patterns
- **Field Selection**: Efficient projection queries using MongoDB's `select`
- **Pagination**: Ready for future pagination implementation
- **Caching**: Architecture supports future caching implementation

## Future Enhancements

- **Pagination**: Add `limit` and `offset` parameters
- **Sorting**: Add `sort` parameter for custom ordering
- **Aggregation**: Add usage summary and analytics endpoints
- **Real-time Updates**: WebSocket support for real-time usage updates
- **Bulk Operations**: Batch retrieval of multiple usage records

## Compliance Notes

- ✅ **TMF635 v4.0.0**: Full compliance with specification
- ✅ **GET Operations**: Only implements defined GET endpoints
- ✅ **Resource Schema**: Follows TMF635 resource structure exactly
- ✅ **Filtering**: Implements TMF635 filter parameters
- ✅ **Response Format**: TMF635-compliant JSON responses
- ✅ **Backward Compatibility**: Maintains old API functionality
- ✅ **MongoDB Integration**: Optimized database queries and indexing
