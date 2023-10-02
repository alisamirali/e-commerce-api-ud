const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");
const APIError = require("../utils/APIError");

// @desc    Get all brand
// @route   GET /api/v1/brands
// @access  Public
const getBrands = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);

  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc    Get a brand
// @route   GET /api/v1/brands/:slug
// @access  Public
const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  }

  res.status(200).json({ data: brand });
});

// @desc    Create a brand
// @route   POST /api/v1/brands
// @access  Private
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });

  res.status(201).json({ data: brand });
});

// @desc    Update a brand
// @route   PUT /api/v1/brands/:id
// @access  Private
const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  }

  res.status(200).json({ data: brand });
});

// @desc    Delete a brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findOneAndDelete({ _id: id });

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  }

  res.status(200).json({ message: "Brand deleted successfully" });
});

// Export all the methods
module.exports = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
