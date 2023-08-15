import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    id: Number,
    userId: Number,
    cartId: Number,
    totalPrice: Number,
    city: String,
    street: String,
    shippingDate: String,
    orderCreated: String,
    creditCard: Number
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;