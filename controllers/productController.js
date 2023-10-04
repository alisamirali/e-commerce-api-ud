const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const APIError = require("../utils/APIError");

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).skip(skip).limit(limit).populate({path: "category", select: "name" -_id});

  res.status(200).json({ results: products.length, page, data: products });
});

// @desc    Get a product
// @route   GET /api/v1/products/:slug
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({path: "category", select: "name" -_id});

  if (!product) {
    return next(new APIError("product not found", 404));
  }

  res.status(200).json({ data: product });
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.name);
    
    const product = await Product.create(req.body);
    
    res.status(201).json({ data: product });
});

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  if(req.body.name) req.body.slug = slugify(req.body.name);

  const product = await Product.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(new APIError("Product not found", 404));
  }

  res.status(200).json({ data: product });
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return next(new APIError("Product not found", 404));
  }
 
  res.status(200).json({ message: "Product deleted successfully" });
});


// Export all the methods
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
