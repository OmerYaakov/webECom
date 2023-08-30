import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import CartModel from "../models/Cart.model.js";
import WishListModel from "../models/WishList.model.js";



const create = async (req, res) => {
    try {
        // Generate user data
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const userId = Math.floor(Math.random() * 1000000000);
        const cartId = Math.floor(Math.random() * 1000000000);

        // Create CartModel and WishListModel instances
        const cart = new CartModel({
            id: cartId,
            userId: userId,
            products: [],
            totalPrice: 0,
        });

        const wishList = new WishListModel({
            userId: userId,
            products: [],
        });

        // Save CartModel and WishListModel instances
        await Promise.all([cart.save(), wishList.save()]);

        // Create User instance
        const user = new User({
            userId: userId,
            cartId: cartId,
            firstName: req.body.firstName ? req.body.firstName : '',
            lastName: req.body.lastName ? req.body.lastName : '',
            username: req.body.username,
            password: hash,
            city: req.body.city ? req.body.city : '',
            street: req.body.street ? req.body.street : '',
            role: req.body.role || 'user',
            isAdmin: req.body.isAdmin || false,
        });

        // Save User instance
        user.save()
            .then(data => {
                req.session.isAuth = true;
                req.session.user = user;
                res.send(data);
            })
            .catch(err => {
                console.error('Error creating user:', err);
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the User.',
                });
            });
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send({
            message: error.message || 'Some error occurred while creating the User.',
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
    User.find({ userId: req.params.id }).then(user => {
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
    User.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true }).then(user => {
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