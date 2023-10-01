const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");
const APIError = require("../utils/APIError");

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);

  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc    Get a category
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new APIError("Category not found", 404));
  }

  res.status(200).json({ data: category });
});

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, slug: slugify(name) });

  res.status(201).json({ data: category });
});

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(new APIError("Category not found", 404));
  }

  res.status(200).json({ data: category });
});

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOneAndDelete({ _id: id });

  if (!category) {
    return next(new APIError("Category not found", 404));
  }

  res.status(200).json({ data: null });
});

// Export all the methods
module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
