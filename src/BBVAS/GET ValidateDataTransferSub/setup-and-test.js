/**
 * Setup and test script for Data Transfer Validation API
 * This script seeds the database and runs basic tests
 */

require('dotenv').config();
const connectDB = require('../../config/db');
const { seedDataTransferValidations } = require('./dataTransferValidationSeed');
const { runTests } = require('./test-api');

async function setupAndTest() {
  try {
    console.log('🚀 Setting up Data Transfer Validation API...\n');
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected successfully\n');
    
    // Seed the database
    console.log('🌱 Seeding database with sample data...');
    await seedDataTransferValidations();
    console.log('✅ Database seeded successfully\n');
    
    // Wait a moment for the server to be ready
    console.log('⏳ Waiting for server to be ready...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run tests
    console.log('🧪 Running API tests...\n');
    await runTests();
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupAndTest();
}

module.exports = { setupAndTest };
