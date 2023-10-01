const mongoose = require("mongoose");

// Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name can not be less than 3 characters"],
      maxlength: [32, "Name can not be more than 32 characters"],
      unique: [true, "Name must be unique"],
    },
    slug: {
      type: String,
      unique: [true, "Slug must be unique"],
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// Model
module.exports = mongoose.model("Category", CategorySchema);
