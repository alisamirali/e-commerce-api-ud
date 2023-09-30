const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");

// Load env vars
dotenv.config({
  path: "config.env",
});

const dbConnection = require("./config/db");
const categoryRoute = require("./routes/categoryRoute");

dbConnection();

// Initialize express
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port 8000");
});
