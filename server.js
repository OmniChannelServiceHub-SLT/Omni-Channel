require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

connectDB(); // <-- connect to MongoDB

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
