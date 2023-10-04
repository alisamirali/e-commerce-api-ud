const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// @desc  Validator for POST /products
exports.createProductValidator = [
    check("name")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters long")
    .notEmpty()
    .withMessage("Product title is required"),

    check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Product description must be at least 2000 characters long"),

    check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),

    check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),

    check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Product price must be at least 32 characters long"),

    check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .custom((value, { req }) => {
        if (req.body.price === value) {
            throw new Error("Product price after discount must be different from the product price");
        } 
            return true;
        
    }),

    check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array"),
    
    check("imageCover")
    .notEmpty()
    .withMessage("Product image cover is required"),


    check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array"),

    check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Product category must be a valid MongoDB ID"),


    check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Product sub category must be a valid MongoDB ID"),

    check("brand")
    .optional()
    .isMongoId()
    .withMessage("Product brand must be a valid MongoDB ID"),

    check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratings average must be a number")
    .isLength({ min:  1})
    .withMessage("Product ratings average must be at least 1 characters long")
    .isLength({ max:  5})
    .withMessage("Product ratings average must be at most 5 characters long"),

    check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratings quantity must be a number"),

    validatorMiddleware,
];

// @desc  Validator for GET /products/:id
exports.getProductValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid Product ID"),

    validatorMiddleware,
];

// @desc  Validator for PUT /products/:id
exports.updateProductValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid Product ID"),

    validatorMiddleware,
];

// @desc  Validator for DELETE /products/:id
exports.deleteProductValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid Product ID"),

    validatorMiddleware,
];