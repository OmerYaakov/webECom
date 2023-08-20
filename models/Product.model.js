import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    id: Number,
    productName: String,
    categoryId: String,
    price: Number,
    image: String,
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;