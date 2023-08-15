import mongoose from 'mongoose';


const CategorySchema = mongoose.Schema({
    categoryName: String,
    categoryImage: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);