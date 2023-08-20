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
            cartId: "0"
        });
        //save user in the database
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

// const findByUserNameAndPassword = (req, res) => {
// }

export {
    create,
    // findByUserNameAndPassword,
    // findByUserName,
    update,
    findOne,
    findAll,
    // findByIdNumber,
    remove
}