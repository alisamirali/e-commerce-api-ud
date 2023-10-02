const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// @desc   Validator for GET /brands/:id
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID"),
  validatorMiddleware,
];

// @desc   Validator for POST /brands
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Brand name must be at most 32 characters long"),
  validatorMiddleware,
];

// @desc   Validator for PUT /brands/:id
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID"),
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Brand name must be at most 32 characters long"),
  validatorMiddleware,
];

// @desc   Validator for DELETE /brands/:id
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID"),
  validatorMiddleware,
];
