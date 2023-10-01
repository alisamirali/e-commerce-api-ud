const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// @desc   Validator for GET /categories/:id
exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

// @desc   Validator for POST /categories
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters long"),
  validatorMiddleware,
];

// @desc   Validator for PUT /categories/:id
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters long"),
  validatorMiddleware,
];

// @desc   Validator for DELETE /categories/:id
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];
