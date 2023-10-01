const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A sub category must have a name"],
      unique: true,
      trim: true,
      minlength: [
        2,
        "A sub category name must have more or equal then 3 characters",
      ],
      maxlength: [
        32,
        "A sub category name must have less or equal then 40 characters",
      ],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "A sub category must have a category"],
    },
  },
  { timestamps: true }
);

// Model
module.exports = mongoose.model("SubCategory", subCategorySchema);
