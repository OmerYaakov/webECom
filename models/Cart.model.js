import mongoose from 'mongoose';

const CartSchema = mongoose.Schema({
    id: Number,
    userId: Number,
    cartProducts: [{ id: Number, quantity: Number, price: Number, name: String, description: String, image: String }],
    totalPrice: Number
});

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;