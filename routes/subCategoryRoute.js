const express = require("express");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} = require("../controllers/subCategoryController");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

// Base route "/"
router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

// Routes with "/:id"
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
