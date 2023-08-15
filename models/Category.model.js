import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    id: Number,
    categoryName: String,
    categoryImage: String,
});

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;