import bcrypt from 'bcrypt';
import User from '../models/User.model.js';


exports.create = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            idNumber: req.body.idNumber,
            password: hash,
            city: req.body.city,
            street: req.body.street,
            role: req.body.role || 'user',
            cartId: OBJECT_ID_DEAFAULT
        });
        //save user in the database
        user.save()
        // TODO: add cartId to user -------------------------------------------------------------
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

exports.findAll = (req, res) => {
};

exports.findOne = (req, res) => {
};

exports.update = (req, res) => {
};

exports.delete = (req, res) => {
}

exports.findByUserName = (req, res) => {
}

exports.findByIdNumber = (req, res) => {
}

exports.findByUserNameAndPassword = (req, res) => {
}