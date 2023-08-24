import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import UserModel from "../models/User.model.js";


const create = async (req, res) => {
    try {
        console.log("creating the user...")
        const username =req.body.username
        console.log("user name: " , username)
        //checking if the user exist by username...
        // const findUser = await UserModel.findOne(username)
        // if(findUser){
        //     return res.render('/signup')
        // }

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(req.body.password, salt);

        console.log("create user");
        const user = new User({
            userId: Math.floor(Math.random() * 1000000000),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            idNumber: req.body.idNumber,
            password: hash,
            city: req.body.city,
            street: req.body.street,
            role: req.body.role || 'user',
            cartId: "0"
        });

        //isAuth
        req.session.isAuth=true
        //save user in the database
        console.log("save user");
        user.save()
            .then(data => {
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
    console.log(req.params.id);
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

// const findByUserName = (req, res) => {
// }

// const findByIdNumber = (req, res) => {
// }

const findByUserNameAndPassword = (req, res) => {
    console.log(req.body);
    User.find({ username: req.query.username }).then(user => {
        console.log(user);
        if (user.length == 0) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            if (bcrypt.compareSync(req.query.password, user[0].password)) {
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
    // findByUserName,
    update,
    findOne,
    findAll,
    // findByIdNumber,
    remove
}