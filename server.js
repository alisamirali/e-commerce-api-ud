const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");

// Load env vars
dotenv.config({
  path: "config.env",
});

const dbConnection = require("./config/db");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const APIError = require("./utils/APIError");
const globalError = require("./middlewares/errorMiddleware");

dbConnection();

// Initialize express
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Error Handler Middleware
app.use(globalError);

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Server is listening on port 8000");
});

// Events that can crash the node process
// 1. Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!\nShutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// 2. Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!\nShutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
