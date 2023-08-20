import mongoose from 'mongoose';

const ContactSchema = mongoose.Schema({
    id:Number,
    name: String,
    phoneNumber: Number,
    mail: String,
    message:String
});

const ContactModel = mongoose.model('Contact', ContactSchema);

export default ContactModel;