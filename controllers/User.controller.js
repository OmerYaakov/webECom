import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import UserModel from "../models/User.model.js";


const create = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            userId: Math.floor(Math.random() * 1000000000),
            firstName: req.body.firstName ? req.body.firstName : " ",
            lastName: req.body.lastName ? req.body.lastName : " ",
            username: req.body.username,
            idNumber: req.body.idNumber ? req.body.idNumber : " ",
            password: hash,
            city: req.body.city ? req.body.city : " ",
            street: req.body.street ? req.body.street : " ",
            role: req.body.role || 'user',
            isAdmin: req.body.isAdmin || false,
            cartId: req.body.cartId || 0,
        });
        user.save()
            .then(data => {
                req.session.isAuth = true
                req.session.user = user
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
    } catch (error) {
        console.log("error");
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

const findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

const findOne = (req, res) => {
    User.find({ idNumber: req.params.id }).then(user => {
        res.send(user);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
};

const update = (req, res) => {
    console.log(req.params.id);
    User.findOneAndUpdate({ idNumber: req.params.id }, req.body, { new: true }).then(user => {
        res.send(user);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
};

const remove = (req, res) => {
    console.log(req.params.id);
    User.findOneAndDelete({ idNumber: req.params.id }).then(user => {
        res.send(user);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}

const findByUserNameAndPassword = (req, res) => {
    User.find({ username: req.query.username }).then(user => {
        if (user.length == 0) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            if (bcrypt.compareSync(req.query.password, user[0].password)) {
                req.session.isAuth = true
                req.session.user = user[0]
                res.send(user);
            } else {
                res.status(401).send({
                    message: "Wrong password"
                });
            }
        }
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}

export {
    create,
    findByUserNameAndPassword,
    update,
    findOne,
    findAll,
    remove
}