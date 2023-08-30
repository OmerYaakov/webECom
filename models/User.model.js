import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userId: Number,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    city: String,
    street: String,
    role: String,
    cartId: Number,
    isAdmin: Boolean,
    wishListId:String,
    orders:[{orderId:Number , totalPrice:Number , date : Date}]
});
const userModel = mongoose.model('User', UserSchema);
export default userModel;