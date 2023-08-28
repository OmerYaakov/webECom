import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    id: Number,
    modelNumber: Number,
    details: String,
    categoryName: String,
    goldWeight: Number,
    goldType: String,
    diamondWeight: Number,
    diamondNumber: Number,
    price: Number,
    image: String
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;