const express = require("express");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
  setCategoryIdToBody,
  createFilterObject
} = require("../controllers/subCategoryController");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
  
} = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true}); // mergeParams: true is used to access the categoryId in the subCategoryRoute.js

// Base route "/"
router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories)

// Routes with "/:id"
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
