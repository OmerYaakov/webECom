import CartModel from "../models/Cart.model.js";

const create = async (req, res) => {
    const cart = new CartModel({
        id: req.body.id,
        userId: req.body.userId,
        cartProducts: [],
        totalPrice: 0,
    });
    try {
        const data = await cart.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Cart.",
        });
    }
};

const findAll = (req, res) => {
    CartModel.find().then((carts) => {
        res.status(200).send(carts);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carts.",
        });
    });
};

const findOne = (req, res) => {
    CartModel.findOne({ id: req.params.id }).then((cart) => {
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.id,
            });
        }
        res.status(200).send(cart);
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.id,
            });
        }
        return res.status(500).send({
            message: "Error retrieving cart with id " + req.params.id,
        });
    });
};

const update = (req, res) => {
    CartModel.findOneAndUpdate(
        { id: req.params.id },
        {
            id: req.body.id,
            userId: req.body.userId,
        },
        { new: true }
    ).then((cart) => {
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.id,
            });
        }
        res.status(200).send(cart);
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.id,
            });
        }
        return res.status(500).send({
            message: "Error updating cart with id " + req.params.id,
        });
    });
};

const remove = (req, res) => {
    CartModel.findOneAndRemove({ id: req.params.id })
        .then((cart) => {
            if (!cart) {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id,
                });
            }
            res.status(200).send({ message: "Cart deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Could not delete cart with id " + req.params.id,
            });
        });
}

export { create, findAll, findOne, update, remove };