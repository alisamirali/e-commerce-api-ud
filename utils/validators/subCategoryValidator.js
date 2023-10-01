const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// @desc   Validator for GET /subcategories/:id
exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Sub Category ID"),
  validatorMiddleware,
];

// @desc   Validator for POST /subcategories
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Sub Category name is required")
    .isLength({ min: 2 })
    .withMessage("Sub Category name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Sub Category name must be at most 32 characters long"),
  check("category")
    .notEmpty()
    .withMessage("Sub Category must belong to a category")
    .isMongoId()
    .withMessage("Invalid Category ID"),
  validatorMiddleware,
];

// @desc   Validator for PUT /subcategories/:id
exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Sub Category ID"),
  check("name")
    .notEmpty()
    .withMessage("Sub Category name is required")
    .isLength({ min: 3 })
    .withMessage("Sub Category name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Sub Category name must be at most 32 characters long"),
  validatorMiddleware,
];

// @desc   Validator for DELETE /subcategories/:id
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Sub  Category ID"),
  validatorMiddleware,
];
