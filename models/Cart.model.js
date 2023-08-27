import mongoose from 'mongoose';

const CartSchema = mongoose.Schema({
    id: Number,
    userId: Number,
    cartProducts: [{ type: String }],
    totalPrice: Number
});

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;