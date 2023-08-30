import mongoose from 'mongoose';

const WishListSchema = mongoose.Schema({
    id: Number,
    products:[{ name: String , id:Number , price : Number, image: String}]
});
const WishListModel = mongoose.model('WishList', WishListSchema);
export default WishListModel;