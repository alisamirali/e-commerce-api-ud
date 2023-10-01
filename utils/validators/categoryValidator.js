const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// @desc   Validator for GET /categories/:id
const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

module.exports = getCategoryValidator;
