import mongoose from 'mongoose';

const BranchSchema = mongoose.Schema({
    name: String,
    address: String,
    hours: String,
    phone: String,
});

const BranchModel = mongoose.model('Branch', BranchSchema);

export default BranchModel;