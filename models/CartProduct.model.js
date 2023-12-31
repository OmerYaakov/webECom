import mongoose from 'mongoose';


const CartProductSchema = mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    amount: Number,
    totalPrice: Number,
    name: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
}, {
    timestamps: true
});

module.exports = mongoose.model('CartProduct', CartProductSchema);