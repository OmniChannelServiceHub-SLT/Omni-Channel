const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 8678;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start().catch(err => {
  console.error('Failed to start server:', err);
});
