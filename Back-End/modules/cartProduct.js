const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    product: {  // Changed from productId to match controller
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: 1  // Added default value
    },
    user: {  // Changed from userId to match controller
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

const addToCartModel = mongoose.model('addToCart', addToCartSchema);
module.exports = addToCartModel;