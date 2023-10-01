const express = require("express");
const getCategoryValidator = require("../utils/validators/categoryValidator");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
