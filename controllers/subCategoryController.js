const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const SubCategory = require("../models/subCategoryModel");
const APIError = require("../utils/APIError");

const setCategoryIdToBody = (req, res, next) => {
  // If the category is not provided in the body, then use the categoryId from the params
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }

  next();
}

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

// @desc    Get all subCategories by category
// @route   GET /api/v1/categories/:categoryId/subcategories
// @access  Public
const getSubCategoriesByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find({ category: categoryId })
    .skip(skip)
    .limit(limit)
    .populate({path: "category", select: "name -_id"});

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

const createFilterObject = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  } 

  req.filter = filter;
  next();
}

// @desc    Get all subCategories
// @route   GET /api/v1/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  

  const subCategories = await SubCategory.find(req.filter).skip(skip).limit(limit).populate({path: "category", select: "name -_id"});

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc    Get a subCategory
// @route   GET /api/v1/subcategories/:slug
// @access  Public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate({path: "category", select: "name -_id"});

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
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
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

  res.status(204).json({ message: "Sub Category deleted" });
});

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
  getSubCategoriesByCategory,
  setCategoryIdToBody,
  createFilterObject
};
