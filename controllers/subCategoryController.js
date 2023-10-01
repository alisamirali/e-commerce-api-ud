const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const SubCategory = require("../models/subCategoryModel");
const APIError = require("../utils/APIError");

// @desc    Create a subCategory
// @route   POST /api/v1/subcategories
// @access  Private
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ data: subCategory });
});

// @desc    Get all subCategories
// @route   GET /api/v1/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc    Get a subCategory
// @route   GET /api/v1/subcategories/:slug
// @access  Public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    return next(new APIError("Sub Category not found", 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc    Update a subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!subCategory) {
    return next(new APIError("Sub Category not found", 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc    Delete a subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findOneAndDelete({ _id: id });

  if (!subCategory) {
    return next(new APIError("Sub Category not found", 404));
  }

  res.status(200).json({ data: null });
});

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
};
