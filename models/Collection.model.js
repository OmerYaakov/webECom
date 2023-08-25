import mongoose from 'mongoose';

const CollectionSchema = mongoose.Schema({
    id: Number,
    name: String,
    Date: Date,
    products: []
});

const CollectionModel = mongoose.model('Collection', CollectionSchema);

export default CollectionModel;