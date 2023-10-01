const { validationResult } = require("express-validator");

// @desc    Middleware to check for validation errors
const validatorMiddleware = (req, res, next) => {
  // Check for validation errors and return them if any found
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = validatorMiddleware;
