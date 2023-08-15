import bcrypt from 'bcrypt';
import User from '../models/User.model.js';


const create = async (req, res) => {
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
            cartId: 0
        });
        //save user in the database
        // user.save()
        // TODO: add cartId to user -------------------------------------------------------------
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

const findAll = (req, res) => {
};

const findOne = (req, res) => {
};

const update = (req, res) => {
};

const remove = (req, res) => {
}

const findByUserName = (req, res) => {
}

const findByIdNumber = (req, res) => {
}

const findByUserNameAndPassword = (req, res) => {
}

export {
    create,
    findByUserNameAndPassword,
    findByUserName,
    update,
    findOne,
    findAll,
    findByIdNumber,
    remove
}