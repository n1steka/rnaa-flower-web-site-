// models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String },
    brand: { type: String, },
    description: { type: String },
    category: { type: String },
    price: { type: Number, },
    image: { type: String, },
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;