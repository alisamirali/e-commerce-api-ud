const express = require("express");
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const brandsRoute = require("./brandRoute");

const router = express.Router();

// router.use("/:brandId/brands", brandsRoute);

// Base route "/"
router.route("/").get(getBrands).post(createBrand);

// Routes with "/:id"
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
