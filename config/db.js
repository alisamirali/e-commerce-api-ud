const mongoose = require("mongoose");

const dbConnection = () => {
  // Connect to MongoDB
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log(err);
      process.exit(1); // Stop the application
    });
};

module.exports = dbConnection;
