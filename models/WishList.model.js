import mongoose from 'mongoose';

const WishListSchema = mongoose.Schema({
    userId: Number,
    products:[{ type: String }]
});
const WishListModel = mongoose.model('WishList', WishListSchema);
export default WishListModel;