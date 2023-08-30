import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    id: Number,
    productName: String,
    modelNumber: Number,
    details: String,
    categoryName: String,
    goldWeight: Number,
    goldType: String,
    diamondWeight: Number,
    diamondNumber: Number,
    price: Number,
    image: String,
    quantity: Number,
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;