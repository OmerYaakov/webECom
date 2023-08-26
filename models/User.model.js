import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    idNumber: Number,
    password: String,
    city: String,
    street: String,
    role: String,
    cartId: String,
    isAdmin: Boolean
});
const userModel = mongoose.model('User', UserSchema);
export default userModel;