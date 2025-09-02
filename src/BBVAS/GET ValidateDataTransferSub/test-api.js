/**
 * Test file for Data Transfer Validation API
 * Run this file to test the ValidateDataTransferSub endpoints
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
const testCases = [
  {
    name: 'Valid Request',
    url: '/ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802',
    expectedStatus: 200
  },
  {
    name: 'Missing subscriberId',
    url: '/ValidateDataTransferSub?receiver=94382222802',
    expectedStatus: 400
  },
  {
    name: 'Missing receiver',
    url: '/ValidateDataTransferSub?subscriberId=cen2431747',
    expectedStatus: 400
  },
  {
    name: 'With field selection',
    url: '/ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802&fields=id,href,state',
    expectedStatus: 200
  },
  {
    name: 'Health check',
    url: '/ValidateDataTransferSub/health',
    expectedStatus: 200
  }
];

async function runTests() {
  console.log('🧪 Testing Data Transfer Validation API...\n');
  
  for (const testCase of testCases) {
    try {
      console.log(`📋 Test: ${testCase.name}`);
      console.log(`🔗 URL: ${BASE_URL}${testCase.url}`);
      
      const response = await axios.get(`${BASE_URL}${testCase.url}`);
      
      console.log(`✅ Status: ${response.status} (Expected: ${testCase.expectedStatus})`);
      console.log(`📄 Response:`, JSON.stringify(response.data, null, 2));
      
      if (response.status === testCase.expectedStatus) {
        console.log('✅ Test PASSED\n');
      } else {
        console.log('❌ Test FAILED - Unexpected status code\n');
      }
      
    } catch (error) {
      if (error.response) {
        console.log(`✅ Status: ${error.response.status} (Expected: ${testCase.expectedStatus})`);
        console.log(`📄 Response:`, JSON.stringify(error.response.data, null, 2));
        
        if (error.response.status === testCase.expectedStatus) {
          console.log('✅ Test PASSED\n');
        } else {
          console.log('❌ Test FAILED - Unexpected status code\n');
        }
      } else {
        console.log(`❌ Test FAILED - Network error: ${error.message}\n`);
      }
    }
  }
  
  console.log('🎉 All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
