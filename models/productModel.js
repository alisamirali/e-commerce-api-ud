const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true,
        minlength: [3, 'A product name must have more or equal then 10 characters'],
        maxlength: [100, 'A product name must have less or equal then 40 characters']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'A product must have a slug'],
        lowercase: true
    
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A product must have a description'],
        minlength: [20, 'A product name must have more or equal then 10 characters'],
        maxlength: [200, 'A product name must have less or equal then 40 characters']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price'],
        trim: true,
        max: [2000, 'A product name must have less or equal then 40 characters'],
    },
    priceAfterDiscount: {
        type: Number,
        // validate: {
        //     validator: function(val) {
        //         // this only points to current doc on NEW document creation
        //         return val < this.price;
        //     },
        //     message: 'Discount price ({VALUE}) should be below regular price'
        // }
    },
    quantity: {
        type: Number,
        required: [true, 'A product must have a quantity']
    },
    sold: {
        type: Number,
        default: 0
    },
    imageCover: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    colors: [String],
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'A product must belong to a category']
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
        required: [true, 'A product must belong to a sub-category']
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
        required: [true, 'A product must belong to a brand']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.66666, 47, 4.7
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);