// Import dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./firebase/firebaseAdmin"); // Firestore setup

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Test route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// API routes
const resourceRoutes = require("./routes/resourceRoutes");
app.use("/api/resources", resourceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
